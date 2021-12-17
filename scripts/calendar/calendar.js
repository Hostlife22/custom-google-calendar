import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { renderEvents } from '../events/events.js';
import { createNumbersArray } from '../common/createNumbersArray.js';

const generateDay = () => {
  let timeSlots = '';

  createNumbersArray(0, 23).map((timeSlot) => {
    timeSlots += `<span class="calendar__time-slot" data-slot="${timeSlot}"></span>`;
  });

  return timeSlots;
};

export const renderWeek = () => {
  const mondayCurrentWeek = getItem('displayedWeekStart');
  const calendarWeek = document.querySelector('.calendar__week');
  const weekRange = generateWeekRange(mondayCurrentWeek);

  calendarWeek.innerHTML = '';

  weekRange.map((day) => {
    calendarWeek.innerHTML += `
    <div class="calendar__day" data-day="${day.getDate()}">${generateDay()}</div>
    `;
  });

  renderEvents();
  setInterval(renderLineTime, 1000);
};

function createLineTime(time) {
  const minutes = time.getMinutes();

  const lineTimeElement = document.createElement('div');
  lineTimeElement.classList.add('current-time__line');

  const circleTimeElement = document.createElement('div');
  circleTimeElement.classList.add('current-time__circle');

  const currentTimeElem = document.createElement('div');
  currentTimeElem.classList.add('current-time');
  currentTimeElem.style.top = `${minutes}px`;
  currentTimeElem.append(lineTimeElement, circleTimeElement);

  return currentTimeElem;
}

export function renderLineTime() {
  const currentTime = new Date();
  const calendarDayElement = document.querySelector(
    `.calendar__day[data-day="${currentTime.getDate()}"]`,
  );

  if (
    calendarDayElement === null ||
    getItem('displayedWeekStart').getMonth() !== currentTime.getMonth()
  ) {
    return;
  }

  const spanCollection = calendarDayElement.childNodes;
  const currentTimeElem = createLineTime(currentTime);

  spanCollection.forEach((timeScale) => {
    if (+timeScale.dataset.slot !== currentTime.getHours()) {
      return;
    }

    const firstElem = timeScale.firstChild;

    firstElem === null
      ? timeScale.appendChild(currentTimeElem)
      : timeScale.replaceChild(currentTimeElem, firstElem);
  });
}
