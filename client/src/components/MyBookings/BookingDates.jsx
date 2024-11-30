function BookingDates({ hasStarted, isActive, hasEnded, startDate, endDate }) {
  if (!hasStarted)
    return <span>Starts {new Date(startDate).toDateString()}</span>;
  else if (isActive)
    return <span>Ends {new Date(endDate).toDateString()}</span>;
  else if (hasEnded)
    return <span>Ended on {new Date(endDate).toDateString()}</span>;
}

export default BookingDates;
