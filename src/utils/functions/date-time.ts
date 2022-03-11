export function addDaysToEpochTime(epochTime: number, days: number): number {
  const result = new Date(epochTime);
  return result.setDate(result.getDate() + days);
}
