let storage = {
  eventIdToDelete: null,
  eventIdToUpdate: null,
  displayedWeekStart: null,
  events: [],
};

export function setItem(key, value) {
  key === 'events' && !Array.isArray(value) ? storage[key].push(value) : (storage[key] = value);
  // const isArray = key === 'events' && !Array.isArray(value);
  // console.log(isArray);
  // if (isArray) {
  //   const events = getItem(key);
  //   events.push(value);
  // }
  // localStorage.setItem(key, JSON.stringify(value));
}

export function getItem(key) {
  // return JSON.parse(localStorage.getItem(key));
  return storage[key];
}
