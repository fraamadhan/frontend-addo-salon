export const dateFormatter = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const parts = new Intl.DateTimeFormat("id-ID", options).formatToParts(date);
  const getParts = (type: string) => parts.find((p) => p.type === type)?.value ?? "";

  const dateFormatted = `${getParts("day")} ${getParts("month")} ${getParts("year")} ${getParts("hour")}:${getParts("minute")} ${getParts("dayPeriod")}`;

  return dateFormatted;
};

export const birthDateFormater = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  const formattedDay = day < 10 ? `0${day}` : `${day}`;

  return `${year}-${formattedMonth}-${formattedDay}`;
};
