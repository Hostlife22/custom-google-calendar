import { createNumbersArray } from '../common/createNumbersArray.js';

export const renderTimescale = () => {
  const timeScaleElem = document.querySelector('.calendar__time-scale');

  createNumbersArray(0, 23).map((timescale) => {
    const timeFormat = timescale >= 0 && timescale <= 9 ? `0${timescale}:00` : `${timescale}:00`;

    timeScaleElem.innerHTML += `
        <span class="calendar__time-scale-hour" data-time-scale=${timescale}>${timeFormat}</span>
    `;
  });
};
