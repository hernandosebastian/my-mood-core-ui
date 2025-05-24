export function getMonthDateRange(referenceDate?: Date) {
  const currentDate = referenceDate || new Date();

  const startDate = new Date(
    Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), 1, 0, 0, 0, 0)
  );

  const endDate = new Date(
    Date.UTC(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    )
  );

  const startDateTwoMonthsAgo = new Date(
    Date.UTC(
      currentDate.getFullYear(),
      currentDate.getMonth() - 2,
      1,
      0,
      0,
      0,
      0
    )
  );

  const firstDayOfYear = new Date(
    Date.UTC(currentDate.getFullYear(), 0, 1, 0, 0, 0, 0)
  );

  const lastDayOfYear = new Date(
    Date.UTC(currentDate.getFullYear(), 11, 31, 0, 0, 0, 0)
  );

  return {
    currentDate,
    startDate,
    endDate,
    startDateTwoMonthsAgo,
    firstDayOfYear,
    lastDayOfYear,
  };
}
