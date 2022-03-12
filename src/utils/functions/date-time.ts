export function addDaysToEpochTime(epochTime: number, days: number): number {
  const result = new Date(epochTime);
  return result.setDate(result.getDate() + days);
}

export function addYearsToEpochTime(epochTime: number, years: number): number {
  const result = new Date(epochTime);
  return result.setFullYear(result.getFullYear() + years);
}
