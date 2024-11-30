import { useEffect, useState } from "react";
import Booking from "./Booking";
import styles from "./MyBookings.module.css";
import { useUserContext } from "../../UserContext";
import { socket } from "../../socket";

function MyBookings() {
  const { bookings } = useUserContext();

  function handleStatusUpdate(queryObj) {
    socket.emit("update status", queryObj);
  }

  return (
    <section>
      <div className={styles.heading}>
        <h1 className={styles.title}>
          <span>My Bookings</span>
        </h1>
      </div>
      {bookings.length ? (
        <div className={styles.bookingContainer}>
          {bookings
            .slice()
            .reverse()
            .map((booking, i) => (
              <Booking
                booking={booking}
                handleStatusUpdate={handleStatusUpdate}
                key={String(booking._id)}
              />
            ))}
        </div>
      ) : (
        <h1 className={styles.title}>
          <span>No Bookings Yet...</span>
        </h1>
      )}
    </section>
  );
}

export default MyBookings;
