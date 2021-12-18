import { getDateTime } from '../common/time.utils.js';
import { getItem } from '../common/storage.js';

export function eventValidator(startTime, endTime, date) {
  const obj = {
    message: '',
    duration: null,
  };

  const DURATION_IN_MINUTES_MAX = 360;
  const DURATION_IN_MINUTES_MIN = 0;

  const TIMESTAMP_IN_SECONDS = 1000;
  const TIMESTAMP_IN_MINUTES = 60;

  obj.duration =
    (getDateTime(date, endTime) - getDateTime(date, startTime)) /
    (TIMESTAMP_IN_SECONDS * TIMESTAMP_IN_MINUTES);

  obj.duration <= DURATION_IN_MINUTES_MIN
    ? (obj.message = 'Incorrect time entry')
    : obj.duration >= DURATION_IN_MINUTES_MAX
    ? (obj.message = 'The event should not last more than 6 hours')
    : (obj.message = 'Correct event time value');

  return obj;
}

export function isIntersection(enteredValue) {
  const events = getItem('events') || [];

  if (events.length === 0) {
    return;
  }

  const idToUpdate = getItem('eventIdToUpdate');
  const filteredEvents = events.filter(({ id }) => id !== idToUpdate);

  return idToUpdate !== null
    ? getIntersection(enteredValue, filteredEvents)
    : getIntersection(enteredValue, events);
}

function getIntersection(event, events) {
  return events.find(({ start, end }) => event.start < end && start < event.end);
}

export function checkingForDeletion(eventIdToDelete, events) {
  const TIMESTAMP_IN_SECONDS = 1000;
  const TIMESTAMP_IN_MINUTES = 60;

  const filteredEvents = events.find(({ id }) => id == eventIdToDelete);
  const currentTime = new Date();
  const timeDifference = Math.abs(
    (new Date(filteredEvents.start) - currentTime) / (TIMESTAMP_IN_SECONDS * TIMESTAMP_IN_MINUTES),
  );
  return timeDifference;
}
