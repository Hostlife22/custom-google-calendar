import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { openModal } from '../common/modal.js';

const getCurrentDay = (day, className) => {
  return new Date(new Date().toDateString()).getTime() === day.getTime()
    ? `${className} ${className}_active`
    : className;
};

export const renderHeader = () => {
  const daysOfWeekArray = generateWeekRange(getItem('displayedWeekStart'));
  const headerElement = document.querySelector('.calendar__header');

  const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

  headerElement.innerHTML = '';

  daysOfWeekArray.map(
    (day) =>
      (headerElement.innerHTML += `
    <div class="calendar__day-label day-label">
      <span class="${getCurrentDay(day, 'day-label__day-name')}">${daysOfWeek[day.getDay()]}</span>
      <span class="${getCurrentDay(day, 'day-label__day-number')}">${day.getDate()}</span>
    </div>`),
  );
};

const createBtnElement = document.querySelector('.create-event-btn');
createBtnElement.addEventListener('click', openModal);
