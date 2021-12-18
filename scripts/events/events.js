import { getItem, setItem } from '../common/storage.js';
import { openPopup, closePopup, contentPopup } from '../common/popup.js';
import { updateEvent } from './updateEvents.js';
import { createTimescaleEvent, createEvent } from './timescaleEvent.js';
import { getEventTime } from '../common/time.utils.js';
import { checkingForDeletion } from './validator.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.delete-event-btn');
const closeEventBtn = document.querySelector('.close-event-btn');
const updateEventBtn = document.querySelector('.update-event-btn');
const calendarTimescaleElem = document.querySelector('.calendar__time-scale');

function handleEventClick(event) {
  const isCalendarEvent = event.target.closest('.calendar__event');
  if (!isCalendarEvent) {
    return;
  }
  const windowInnerWidth = document.documentElement.clientWidth;
  const windowInnerHeight = document.documentElement.clientHeight;
  const WIDTH_OF_THE_POPUP = 400;
  const HEIGHT_OF_THE_POPUP = 200;

  let x = 0;
  let y = 0;

  if (event.clientX || event.clientY) {
    x =
      event.clientX + WIDTH_OF_THE_POPUP <= windowInnerWidth
        ? event.clientX
        : event.clientX - WIDTH_OF_THE_POPUP;
    y =
      event.clientY + HEIGHT_OF_THE_POPUP <= windowInnerHeight
        ? event.clientY
        : event.clientY - HEIGHT_OF_THE_POPUP;
  }

  openPopup(x, y);
  contentPopup(isCalendarEvent);
  setItem('eventIdToDelete', isCalendarEvent.dataset.event);
}

function removeEventsFromCalendar() {
  const events = getItem('events') || [];
  events.map(() => {
    const eventElem = document.querySelector(`.calendar__event`);
    if (eventElem !== null) {
      eventElem.remove();
    }
  });
}

const createEventElement = (event) => {
  const eventElement = document.createElement('div');

  eventElement.classList.add('calendar__event');
  eventElement.setAttribute('data-event', event.id);

  const startTime = new Date(event.start);
  const endTime = new Date(event.end);

  eventElement.innerHTML = `
    <p>${event.title}</p>
    <p>${getEventTime(startTime)} - ${getEventTime(endTime)}</p>
    <p>${event.description}</p>
    `;

  const eventTime = new Date(event.start).getMinutes();
  const heightEvent = new Date(event.end) - new Date(event.start);

  const TIMESTAMP_IN_SECONDS = 1000;
  const TIMESTAMP_IN_MINUTES = 60;

  eventElement.style.top = `${eventTime}px`;
  eventElement.style.height = `${heightEvent / (TIMESTAMP_IN_SECONDS * TIMESTAMP_IN_MINUTES)}px`;

  return eventElement;
};

export const renderEvents = () => {
  const allEvents = getItem('events') || [];
  const calendarDays = [...document.querySelectorAll('.calendar__day')];

  const week = calendarDays.map((el) => +el.dataset.day);

  const filteredEvents = allEvents.filter(({ start }) => {
    const eventDay = new Date(start).getDate();

    if (week.includes(eventDay)) {
      return new Date(start).getMonth() === new Date(getItem('displayedWeekStart')).getMonth();
    }
  });

  filteredEvents.map((event) => {
    const calendarDayElem = document.querySelector(
      `[data-day="${new Date(event.start).getDate()}"]`,
    );
    const currentDayNode = calendarDayElem.childNodes;
    const timeSlot = currentDayNode[new Date(event.start).getHours()];
    const temp = createEventElement(event);
    temp.style.backgroundColor = event.color;
    const element = document.querySelector(`[data-event="${temp.dataset.event}"]`);

    if (element !== null) {
      element.remove();
    }

    timeSlot.appendChild(temp);
  });
};

export function onDeleteEvent() {
  const events = getItem('events') || [];
  const eventIdToDelete = getItem('eventIdToDelete');

  const BEFORE_THE_EVENT_STARTS = 15;

  const popupErrorElem = document.querySelector('.popup__error');
  if (popupErrorElem !== null) {
    popupErrorElem.remove();
  }

  if (checkingForDeletion(eventIdToDelete, events) < BEFORE_THE_EVENT_STARTS) {
    const popupElem = document.querySelector('.popup__description');
    const span = document.createElement('div');

    span.classList.add('popup__error');
    span.textContent = 'The event cannot be deleted 15 minutes before the start';
    popupElem.append(span);

    return;
  }

  const filteredEvents = events.filter(({ id }) => id !== eventIdToDelete);
  removeEventsFromCalendar();
  setItem('events', filteredEvents);

  closePopup();
  renderEvents();
}

deleteEventBtn.addEventListener('click', onDeleteEvent);
weekElem.addEventListener('click', handleEventClick);
weekElem.addEventListener('click', createEvent);
closeEventBtn.addEventListener('click', closePopup);
updateEventBtn.addEventListener('click', updateEvent);
calendarTimescaleElem.addEventListener('click', createTimescaleEvent);
