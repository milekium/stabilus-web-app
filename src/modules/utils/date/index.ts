import { add, differenceInHours } from 'date-fns';

export function getUTCDate(dateString = Date.now()) {
  const date = new Date(dateString);

  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
}
export function getUTCFromDate(dateString: string) {
  const date = new Date(dateString);

  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
}

// console.log(format(new Date(), 'dd MMM, yyyy HH:mm:ss')); // returns local time
// console.log(format(getUTCDate(), 'dd MMM, yyyy HH:mm:ss'), getUTCDate()); // returns UTC time

export function getUTCDaysNumber(dateString: string) {
  const dateLeft = new Date(dateString);
  const dateRight = new Date('1970/1/1');
  return Math.floor(differenceInHours(dateLeft, dateRight) / 24) | 0;
}
export function getUTCHoursNumber(dateString: string, hourString: string) {
  const dateLeft = add(new Date(dateString), {
    hours: Number(hourString.slice(0, 2)),
  });
  const dateRight = new Date('1970/1/1 00:00');
  return Math.floor(differenceInHours(dateLeft, dateRight)) | 0;
}
