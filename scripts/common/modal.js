import { getTimeRange } from './time.utils.js';
import { getDateEvent } from '../events/timescaleEvent.js';

const modalElem = document.querySelector('.modal');

export const openModal = () => {
  const nextHour = +new Date().getHours() + 1;

  document.querySelector('.event-form__field[type="date"]').value = getDateEvent(new Date());
  document.querySelector('.event-form__field[name="startTime"]').value = getTimeRange(nextHour);
  document.querySelector('.event-form__field[name="endTime"]').value = getTimeRange(nextHour + 1);

  modalElem.classList.remove('hidden');
};

export const closeModal = () => {
  modalElem.classList.add('hidden');
};
