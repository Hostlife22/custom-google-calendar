export function setItem(key, value) {
  const isArray = key === 'events' && !Array.isArray(value);
  let events = value;

  if (isArray) {
    events = getItem(key);
    events.push(value);
  }

  localStorage.setItem(key, JSON.stringify(events));
}

export function getItem(key) {
  return JSON.parse(localStorage.getItem(key));
}
