export const getStatsStartAndEndDate = (): {
  startDate: string;
  endDate: string;
} => {
  const currentDate = new Date();

  const endDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  );
  const startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 2,
    1,
    0,
    0,
    0,
    0
  );

  const formatISO = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const milliseconds = String(date.getMilliseconds()).padStart(3, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  return {
    startDate: formatISO(startDate),
    endDate: formatISO(endDate),
  };
};
