import { getItem } from './storage.js';
import { getEventTime } from './time.utils.js';

const popupElem = document.querySelector('.popup');
const popupContentElem = document.querySelector('.popup__content');
const popupDescriptionElem = document.querySelector('.popup__description');

export function openPopup(x, y) {
  popupElem.classList.remove('hidden');
  popupContentElem.style.top = `${y}px`;
  popupContentElem.style.left = `${x}px`;
}

export function contentPopup(elem) {
  const eventId = elem.dataset.event;
  const events = getItem('events');

  const [filteredEvent] = events.filter(({ id }) => id === eventId);

  const options = { weekday: 'long', month: 'long', day: 'numeric' };

  popupDescriptionElem.innerHTML = `
  <p class="popup__title">${filteredEvent.title}</p>
  <p class="popup__event">${filteredEvent.start.toLocaleDateString(
    'en-US',
    options,
  )} at  ${getEventTime(filteredEvent.start)} - ${getEventTime(filteredEvent.end)} o'clock</p>
  <p class="popup__text">${filteredEvent.description}</p>
  `;
}

export function closePopup() {
  popupElem.classList.add('hidden');
}

function onClickInsidePopup(event) {
  event.stopPropagation();
}

popupContentElem.addEventListener('click', onClickInsidePopup);
popupElem.addEventListener('click', closePopup);
