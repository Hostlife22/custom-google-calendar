import { openModal } from '../common/modal.js';
import { getItem } from '../common/storage.js';
import { getTimeRange } from '../common/time.utils.js';

export function getDateEvent(selectedDate) {
  const date = new Date(selectedDate);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();
  const FIRST_TWO_DIGIT_NUMBER = 10;

  if (month < FIRST_TWO_DIGIT_NUMBER) {
    month = '0' + month;
  }
  if (day < FIRST_TWO_DIGIT_NUMBER) {
    day = '0' + day;
  }
  return year + '-' + month + '-' + day;
}

function eventHandler(day, dataAttribute) {
  const date = new Date(new Date(getItem('displayedWeekStart')).setDate(day));
  const startTime = getTimeRange(dataAttribute);
  const endTime = getTimeRange(+dataAttribute + 1);

  document.querySelector('.event-form__field[type="date"]').value = getDateEvent(date);
  document.querySelector('.event-form__field[name="startTime"]').value = startTime;
  document.querySelector('.event-form__field[name="endTime"]').value = endTime;
}

export function createTimescaleEvent(event) {
  if (!event.target.dataset.timeScale) {
    return;
  }

  const date = new Date().getDate();

  openModal();
  eventHandler(date, event.target.dataset.timeScale);
}

export function createEvent(event) {
  if (!event.target.dataset.slot) {
    return;
  }

  const date = event.target.closest('.calendar__day').dataset.day;

  openModal();
  eventHandler(date, event.target.dataset.slot);
}
