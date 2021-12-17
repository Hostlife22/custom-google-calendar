export const createNumbersArray = (from, to) => {
  const numberArray = [];

  for (let i = from; i <= to; i++) {
    numberArray.push(i);
  }

  return numberArray;
};
