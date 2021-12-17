let storage = {
  eventIdToDelete: null,
  eventIdToUpdate: null,
  displayedWeekStart: null,
  events: [],
};

export const setItem = (key, value) => {
  key === 'events' && !Array.isArray(value) ? storage[key].push(value) : (storage[key] = value);
};

export const getItem = (key) => {
  return storage[key];
};
