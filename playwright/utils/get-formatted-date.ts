export function getFormattedDate(date: Date = new Date()): string {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export function getCurrentDay(date: Date = new Date()): number {
  return date.getDate();
}

export function getCurrentMonth(date: Date = new Date()): number {
  return date.getMonth() + 1;
}

export function getCurrentYear(date: Date = new Date()): number {
  return date.getFullYear();
}

