interface IGetStartAndEndOfMonthResponse {
  startDate: string;
  endDate: string;
  month: string;
  year: string;
}

export const getStartAndEndOfMonth = (
  currentDate: Date
): IGetStartAndEndOfMonthResponse => {
  const startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const endDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  return {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    month: month.toString(),
    year: year.toString(),
  };
};

