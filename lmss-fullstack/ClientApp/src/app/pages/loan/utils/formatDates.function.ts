import {formatDate} from "@angular/common";

export function formatDates(date: string) {
  let dateFormatted = null;
  if (date) {
    dateFormatted = formatDate(date, 'yyyy-MM-ddTHH:mm:ss', 'en_US')
  }
  return dateFormatted;
}
