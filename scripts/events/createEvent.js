import { getItem, setItem } from '../common/storage.js';
import { renderEvents, onDeleteEvent } from './events.js';
import { getDateTime } from '../common/time.utils.js';
import { closeModal } from '../common/modal.js';
import { eventValidator, isIntersection } from './validator.js';

const eventFormElem = document.querySelector('.event-form');
const closeEventFormBtn = document.querySelector('.create-event__close-btn');
const error = document.querySelector('.error');

function clearEventForm() {
  error.textContent = '';
  eventFormElem.reset();
}

function onCloseEventForm() {
  setItem('eventIdToDelete', null);
  setItem('eventIdToUpdate', null);

  closeModal();
  clearEventForm();
}

function onCreateEvent(event) {
  event.preventDefault();

  const formData = Object.fromEntries(new FormData(eventFormElem));
  const { title, description, startTime, endTime, date } = formData;

  const duration = eventValidator(startTime, endTime, date);
  error.textContent = duration.message;

  const MINIMUM_DURATION_IN_MINUTES = 15;
  const MAXIMUM_DURATION_IN_MINUTES = 360;

  if (
    duration.duration < MINIMUM_DURATION_IN_MINUTES ||
    duration.duration > MAXIMUM_DURATION_IN_MINUTES
  ) {
    return;
  }

  const selectedColorElem = document.querySelector('.event-form__selected');

  const descriptionForm = {
    id: Date.now().toString(),
    title: title === '' ? '(No title)' : title,
    description,
    start: getDateTime(date, startTime),
    end: getDateTime(date, endTime),
    color: selectedColorElem.dataset.eventColor,
  };

  if (isIntersection(descriptionForm) !== undefined) {
    error.textContent = 'You already have an event for this time';
    return;
  }

  if (getItem('eventIdToUpdate') !== null) {
    onDeleteEvent();
    setItem('eventIdToUpdate', null);
  }

  if (!getItem('events')) {
    setItem('events', []);
  }

  setItem('events', descriptionForm);
  onCloseEventForm();
  renderEvents();
}

export function initEventForm() {
  eventFormElem.addEventListener('submit', onCreateEvent);
  closeEventFormBtn.addEventListener('click', onCloseEventForm);
}
