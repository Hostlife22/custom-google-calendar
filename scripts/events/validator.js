import { getDateTime } from '../common/time.utils.js';
import { getItem } from '../common/storage.js';

export function eventValidator(startTime, endTime, date) {
  const obj = {
    message: '',
    duration: null,
  };

  obj.duration = (getDateTime(date, endTime) - getDateTime(date, startTime)) / (1000 * 60);
  obj.duration <= 0
    ? (obj.message = 'Incorrect time entry')
    : obj.duration >= 360
    ? (obj.message = 'The event should not last more than 6 hours')
    : (obj.message = 'Correct event time value');

  return obj;
}

export function isIntersection(enteredValue) {
  const events = getItem('events');

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
  const filteredEvents = events.find(({ id }) => id == eventIdToDelete);
  const currentTime = new Date();

  const timeDifference = Math.abs((filteredEvents.start - currentTime) / (1000 * 60));
  return timeDifference;
}
