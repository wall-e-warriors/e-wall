import {
  addHours,
  differenceInCalendarDays,
  formatDistanceToNow,
  isPast,
  parseISO,
} from 'date-fns';

const DEFAULT_TIME_IN_24_HRS_FORMAT = 18;

function addReminderText(item) {
  let eventDate = item.parsedDate;
  let now = Date.now();
  let reminderText = '';
  const daysFromNow = differenceInCalendarDays(eventDate, now);

  if (daysFromNow === 0) {
    reminderText = 'TODAY';
  } else if (daysFromNow === 1) {
    reminderText = 'TOMORROW';
  } else if (daysFromNow < 5) {
    reminderText = formatDistanceToNow(eventDate, { addSuffix: true });
  }

  return Object.assign(
    reminderText ? { reminderText: reminderText } : {},
    item,
  );
}

export function processData(responseJson) {
  let parseDateInfo = item =>
    addHours(parseISO(item.date), DEFAULT_TIME_IN_24_HRS_FORMAT);

  return responseJson
    .map(item => Object.assign({ parsedDate: parseDateInfo(item) }, item))
    .map(addReminderText)
    .filter(item => !isPast(item.parsedDate))
    .sort((a, b) => a.parsedDate - b.parsedDate);
}
