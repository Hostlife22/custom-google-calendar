import { getItem, setItem } from '../common/storage.js';
import { renderWeek } from '../calendar/calendar.js';
import { renderHeader } from '../calendar/header.js';
import { getStartOfWeek, getDisplayedMonth } from '../common/time.utils.js';

const navElem = document.querySelector('.navigation');
const displayedMonthElem = document.querySelector('.navigation__displayed-month');

function renderCurrentMonth() {
  const mondayCurrentWeek = getItem('displayedWeekStart');
  const currentMonth = getDisplayedMonth(mondayCurrentWeek);

  displayedMonthElem.textContent = currentMonth;
}

const onChangeWeek = (event) => {
  const switchArrow = event.target.closest('button');

  if (switchArrow === null) {
    return;
  }

  const mondayCurrentWeek = getItem('displayedWeekStart');
  const day = new Date(mondayCurrentWeek).getDate();
  const NUMBER_OF_DAYS = 7;

  const changedMonth =
    switchArrow.dataset.direction === 'next'
      ? new Date(mondayCurrentWeek).setDate(day + NUMBER_OF_DAYS)
      : switchArrow.dataset.direction === 'prev'
      ? new Date(mondayCurrentWeek).setDate(day - NUMBER_OF_DAYS)
      : getStartOfWeek(new Date());

  setItem('displayedWeekStart', new Date(changedMonth));
  renderHeader();
  renderCurrentMonth();
  renderWeek();
};

export const initNavigation = () => {
  renderCurrentMonth();
  navElem.addEventListener('click', onChangeWeek);
};
