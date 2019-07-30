import {
  differenceInCalendarDays,
  formatDistanceToNow,
  isPast,
  parseISO,
} from 'date-fns';

function addReminderText(item) {
  let eventDate = item.parsedDate;
  let now = Date.now();
  let reminderText = '';
  const daysFromNow = differenceInCalendarDays(eventDate, now);

  if (daysFromNow === 0) {
    reminderText = 'TODAY';
  } else if (daysFromNow === 1) {
    reminderText = 'TOMORROW';
  } else if (daysFromNow < 10) {
    reminderText = formatDistanceToNow(eventDate, { addSuffix: true });
  }

  return Object.assign(
    reminderText ? { reminderText: reminderText } : {},
    item,
  );
}

export function processData(responseJson) {
  return responseJson
    .map(item => Object.assign({ parsedDate: parseISO(item.date) }, item))
    .map(addReminderText)
    .filter(item => !isPast(item.parsedDate))
    .sort((a, b) => parseISO(a.date) - parseISO(b.date));
}
