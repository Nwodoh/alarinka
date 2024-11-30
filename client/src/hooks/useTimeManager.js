function useTimeManager({ type, value }) {
  switch (type) {
    case "timeToNumber": {
      const hours = +value.split(":")[0];
      const mins = +value.split(":")[1] / 60;
      return hours + mins;
    }
    case "numberToTime": {
      let hour = Math.floor(value);
      let minute = Math.round((value - hour) * 60);
      if (minute === 60) {
        hour++;
        minute = 0;
      }
      const meridiem = hour < 12 || hour === 24 ? "AM" : "PM";
      hour = hour % 12;
      if (hour === 0) {
        hour = 12;
      }
      const time = hour + ":" + (minute < 10 ? "0" : "") + minute + meridiem;
      return time;
    }
    case "formatDateForInput": {
      const year = value.getFullYear();
      const month = String(value.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day = String(value.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    default:
      throw new Error(`No such api exist as ${type}`);
  }
}

export { useTimeManager };
