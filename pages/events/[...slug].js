import { Fragment } from 'react';
import Head from 'next/head';

import { getFilteredEvents } from '../../helpers/api-util';
import ResultsTitle from '../../components/events/results-title';
import EventList from '../../components/events/event-list';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

function FilteredEventsPage(props) {
    const { month, year } = props.date;

    const pageHeadData = (
        <Head>
            <title>Filtered Events</title>
            <meta 
                name="description"
                content={`All events for ${month}/${year}.`}
            />
        </Head>
    );

    if (props.hasError) {
        return (
            <Fragment>
                {pageHeadData}
                <ErrorAlert><p>Invalid filter. Please adjust your values.</p></ErrorAlert>
                <div className="center">
                        <Button link="/events">Return To All Events</Button>
                </div>
            </Fragment>
        );
    }

    const {filteredEvents} = props;

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                {pageHeadData}
                <ErrorAlert><p>No events found for your chosen filter!</p></ErrorAlert>
                <div className="center">
                    <Button link="/events">Return To All Events</Button>
                </div>
            </Fragment>
            
        )
    }

    const date = new Date(year, (month-1));
    
    return (
        <Fragment>
            {pageHeadData}
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </Fragment>
    );
}

export async function getServerSideProps(context) {
    const { params } = context;

    const filteredData = params.slug;

    const year = +filteredData[0];
    const month = +filteredData[1];

    if (isNaN(year) || isNaN(month) || year > 2030 || year < 2021 || month < 1 || month > 12) {
        return {
            // Since we have the ErrorAlert component we will handle an error ourselves.
            props: { hasError: true },
            // Alternatives: 
            // notFound: true,
            // redirect: {
            //  destination: '/error',
            //},
        }
    }

    const dateFilter = { year, month };

    const filteredEvents = await getFilteredEvents(dateFilter);

    return {
        props: {
            filteredEvents: filteredEvents,
            date: {
                year: year,
                month: month,
            },
        }
    }
}

export default FilteredEventsPage;