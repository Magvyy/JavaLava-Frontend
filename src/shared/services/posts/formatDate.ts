


export function formatDateStringToDDMonthYear(dateString: string): string {
  const dateObj = new Date();
  const parts = dateString.split(' ');

  const dateParts = parts[0].split('-');
  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; 
  const year = parseInt(dateParts[2], 10);
  dateObj.setUTCFullYear(year, month, day);

  const timeParts = parts[1].split(":");
  const hour = parseInt(timeParts[0], 10) - 1;
  const minute = parseInt(timeParts[1], 10);
  dateObj.setUTCHours(hour, minute, 0, 0);

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: "numeric",
    minute: "numeric"
  };

  const formattedDate = dateObj.toLocaleDateString('en-GB', options);

  return formattedDate;
}
