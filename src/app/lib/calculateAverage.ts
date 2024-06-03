const calcutateAverage = (numbers: number[]): number => {
  if (numbers.length === 0) {
    return 0; // Handle case where the array is empty
  }

  const sum = numbers.reduce(
    (acc: number, current: number) => acc + current,
    0
  );
  const average = sum / numbers.length;
  return Math.floor(average);
};

export default calcutateAverage;
