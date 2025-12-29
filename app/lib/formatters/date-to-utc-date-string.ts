export default function dateToUTCDateString(date: Date): string {
  if (!(date instanceof Date)) throw new Error("date is not a Date object");

  // Export the offset timestamp as YYYY-MM-DD
  return date.toISOString().split("T")[0];
}
