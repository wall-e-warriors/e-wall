import {
  differenceInCalendarDays,
  formatDistanceToNow,
  isPast,
  parseISO,
} from 'date-fns';

function addReminderText(item) {
  let eventDate = item.parsedDate;
  let now = Date.now();
  if (differenceInCalendarDays(eventDate, now) < 10) {
    return Object.assign(
      { reminderText: formatDistanceToNow(eventDate, { addSuffix: true }) },
      item,
    );
  }
  return item;
}

export function processData(responseJson) {
  return responseJson
    .map(item => Object.assign({ parsedDate: parseISO(item.date) }, item))
    .map(addReminderText)
    .filter(item => !isPast(item.parsedDate))
    .sort((a, b) => parseISO(a.date) - parseISO(b.date));
}
