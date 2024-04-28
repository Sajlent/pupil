const calcutatePassedDays = (date: string) => {
  if (typeof date !== "string") return "";

  const currentDate = new Date();
  // calculated difference between today and given date in miliseconds
  const difference = currentDate.getTime() - Number(date);

  // return time difference converted from miliseconds to days
  return Math.floor(difference / (1000 * 60 * 60 * 24));
};

export default calcutatePassedDays;
