import { getItem, setItem } from '../common/storage.js';
import { openModal } from '../common/modal.js';
import { closePopup } from '../common/popup.js';
import { getEventTime } from '../common/time.utils.js';
import { getDateEvent } from './timescaleEvent.js';

export const updateEvent = () => {
  openModal();
  closePopup();

  const events = getItem('events');
  const eventIdToDelete = getItem('eventIdToDelete');

  const filteredEvents = events.filter(({ id }) => id == eventIdToDelete);
  const [filteredEvent] = filteredEvents;

  document.querySelector('.event-form__field[type="text"]').value = filteredEvent.title;
  document.querySelector('.event-form__field[type="date"]').value = getDateEvent(
    new Date(filteredEvent.start),
  );

  document.querySelector('.event-form__field[name="startTime"]').value = getEventTime(
    filteredEvent.start,
  );
  document.querySelector('.event-form__field[name="endTime"]').value = getEventTime(
    filteredEvent.end,
  );
  document.querySelector('.event-form__field[name="description"]').value =
    filteredEvent.description;

  setItem('eventIdToUpdate', eventIdToDelete);
};
