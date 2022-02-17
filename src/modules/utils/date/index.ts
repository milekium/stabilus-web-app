import { /*addDays,*/ format } from 'date-fns';
// console.log(addDays(new Date(2014, 8, 1), 10));

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

console.log(format(new Date(), 'dd MMM, yyyy HH:mm:ss')); // returns local time
console.log(format(getUTCDate(), 'dd MMM, yyyy HH:mm:ss'), getUTCDate()); // returns UTC time
