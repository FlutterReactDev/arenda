export function generateYearsBetween(startYear = 1900, endYear?: number) {
  const endDate = endYear || new Date().getFullYear();
  const years: number[] = [];

  for (let i = startYear; i <= endDate; i++) {
    years.push(startYear);
    startYear++;
  }
  return years;
}
