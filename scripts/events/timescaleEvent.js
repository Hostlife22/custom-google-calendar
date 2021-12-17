import { getItem, setItem } from '../common/storage.js';
import { openModal } from '../common/modal.js';
import { getTimeRange } from '../common/time.utils.js';

export function getDateEvent(selectedDate) {
  const date = new Date(selectedDate);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  if (month < 10) month = '0' + month;
  if (day < 10) day = '0' + day;

  return year + '-' + month + '-' + day;
}

function eventHandler(day, dataAttribute) {
  const date = new Date(getItem('displayedWeekStart').setDate(day));
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
