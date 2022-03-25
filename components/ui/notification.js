import { useContext } from 'react';

import NotificationContext from '../../store/notification-context';

import classes from './notification.module.css';

function Notification(props) {
  const { title, message, status } = props;
  const notificationCtx = useContext(NotificationContext);

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'pending') {
    statusClasses = classes.pending;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={notificationCtx.hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;