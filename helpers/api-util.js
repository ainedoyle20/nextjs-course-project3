export async function getAllEvents() {
  const response = await fetch('https://nextjs-course-76092-default-rtdb.europe-west1.firebasedatabase.app/events.json');
  const data = await response.json();
  
  const allEvents = [];
  for (let key in data) {
      allEvents.push({ id: key, ...data[key] });
  }

  return allEvents;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();

  const featuredEvents = allEvents.filter(event => event.isFeatured);

  return featuredEvents;    
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();

  return allEvents.find((event) => event.id === id);
} 

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();
  let filteredEvents = allEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === (month - 1);
  });

  return filteredEvents;
}