import { getTimeRange } from './time.utils.js';
import { getDateEvent } from '../events/timescaleEvent.js';
import { renderEventColor } from '../events/eventColors.js';

const modalElem = document.querySelector('.modal');
const selectColorsElem = document.querySelector('.event-form__select-color');
const colorsElem = document.querySelector('.event-form__colors');

export const openModal = () => {
  const nextHour = +new Date().getHours() + 1;

  document.querySelector('.event-form__field[type="date"]').value = getDateEvent(new Date());
  document.querySelector('.event-form__field[name="startTime"]').value = getTimeRange(nextHour);
  document.querySelector('.event-form__field[name="endTime"]').value = getTimeRange(nextHour + 1);
  renderEventColor();
  modalElem.classList.remove('hidden');
};

export const closeModal = () => {
  modalElem.classList.add('hidden');
  closePicker();
};

function openPicker() {
  colorsElem.classList.remove('event-form__colors_hidden');
}

function closePicker() {
  colorsElem.classList.add('event-form__colors_hidden');
}

function onClickInsidePicker(event) {
  closePicker();
  event.stopPropagation();

  const selectedColor = event.target.classList.contains('event-form__color');

  if (!selectedColor) {
    return;
  }

  const selectedColorElem = document.querySelector('.event-form__selected');

  selectedColorElem.dataset.eventColor = event.target.dataset.color;
  selectedColorElem.style.backgroundColor = event.target.dataset.color;
}

selectColorsElem.addEventListener('click', openPicker);
colorsElem.addEventListener('click', onClickInsidePicker);
