
export const getOrdinalSuffix = (num:number):string => {
  const j = num % 10,
        k = num % 100;
  if (j == 1 && k != 11) {
    return num + "st";
  }
  if (j == 2 && k != 12) {
    return num + "nd";
  }
  if (j == 3 && k != 13) {
    return num + "rd";
  }
  return num + "th";
}

export const convertDate = (isoDate: string) => {
  const date = new Date(isoDate);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  } else {
    const day = getOrdinalSuffix(date.getDate());
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }
};

export const convertWeekDay = (isoDate: string) => {
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
  };
  return date.toLocaleDateString('en-US', options);
};

export const convertWeekDayLong = (isoDate:string) => {
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
  };
  return date.toLocaleDateString('en-US', options);
};


export const formatDateWithOrdinalNumber = (date) => {
  const months = [
      "January", "February", "March",
      "April", "May", "June",
      "July", "August", "September",
      "October", "November", "December"
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  let dayWithOrdinal = day;
  if (day > 3 && day < 21) {
      dayWithOrdinal += 'th';
  } else {
      switch (day % 10) {
          case 1:
              dayWithOrdinal += 'st';
              break;
          case 2:
              dayWithOrdinal += 'nd';
              break;
          case 3:
              dayWithOrdinal += 'rd';
              break;
          default:
              dayWithOrdinal += 'th';
              break;
      }
  }

  return `${month} ${dayWithOrdinal}, ${year}`;
}
