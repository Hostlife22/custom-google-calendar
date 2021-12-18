import shmoment from './shmoment.js';

export const getStartOfWeek = (date) => {
  const dateCopy = new Date(date);
  const dayOfWeek = dateCopy.getDay();
  const difference = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(dateCopy.setDate(new Date(date).getDate() + difference));

  return new Date(monday.getFullYear(), monday.getMonth(), monday.getDate());
};

export const generateWeekRange = (startDate) => {
  const result = [];
  for (let i = 0; i < 7; i += 1) {
    const base = new Date(startDate);

    result.push(new Date(base.setDate(base.getDate() + i)));
  }

  return result;
};

export const getDateTime = (date, time) => {
  const [hours, minutes] = time.split(':');
  const withHours = new Date(new Date(date).setHours(Number(hours)));
  const withMinutes = new Date(new Date(withHours).setMinutes(Number(minutes)));

  return withMinutes;
};

const monthsNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const getDisplayedMonth = (date) => {
  const weekStart = getStartOfWeek(date);
  const weekEnd = shmoment(date).add('days', 6).result();
  const startMonth = weekStart.getMonth();
  const startYear = weekStart.getFullYear();
  const endMonth = weekEnd.getMonth();
  const endYear = weekEnd.getFullYear();
  const isSameMonth = startMonth === endMonth;

  if (isSameMonth) {
    return `${monthsNames[startMonth]} ${startYear}`;
  }

  const isSameYear = startYear === endYear;

  return isSameYear
    ? `${monthsNames[startMonth]} - ${monthsNames[endMonth]} ${startYear}`
    : `${monthsNames[startMonth]} ${startYear} - ${monthsNames[endMonth]} ${endYear}`;
};

export const getEventTime = (date) => {
  const time = new Date(date);
  let hours = time.getHours();
  let minutes = time.getMinutes();

  if (hours >= 0 && hours <= 9) {
    hours = `0${hours}`;
  }

  if (minutes >= 0 && minutes <= 9) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
};

export function getTimeRange(time) {
  return time >= 0 && time <= 9 ? `0${time}:00` : `${time}:00`;
}
