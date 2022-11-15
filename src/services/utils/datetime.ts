export const convertDateTimeToGMT7 = (datetime: string) => {
  const dateObject = new Date(datetime);
  return new Date(dateObject.getTime());
};

export const convertDBDateTimeToDateString = (datetime: string) => {
  const convertedDate = convertDateTimeToGMT7(datetime);
  const day = convertedDate.getDate();
  const month = convertedDate.getMonth() + 1;
  const year = convertedDate.getFullYear();
  return day + "/" + month + "/" + year;
};

export const countTimeGap = (date: Date) => {
  const timeGap = Date.now() - date.getTime();
  const minute = Math.floor(timeGap / 1000 / 60);
  const hour = Math.floor(minute / 60);
  const day = Math.floor(hour / 24);
  const week = Math.floor(day / 7);
  let timelineChoosen;

  if (week > 0) {
    timelineChoosen = "w";
  } else if (day > 0) {
    timelineChoosen = "d";
  } else if (hour > 0) {
    timelineChoosen = "h";
  } else if (minute > 0) {
    timelineChoosen = "m";
  } else {
    timelineChoosen = "s";
  }

  let result;
  switch (timelineChoosen) {
    case "w": {
      result = `${week} tuần trước`;
      break;
    }
    case "d": {
      result = `${day} ngày trước`;
      break;
    }
    case "h": {
      result = `${hour} giờ trước`;
      break;
    }
    case "m": {
      result = `${minute} phút trước`;
      break;
    }
    default:
      result = "Vừa mới đây";
  }
  return result;
};
