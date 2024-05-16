import { useEffect, useState } from "react";
import Booking from "./Booking";
import styles from "./MyBookings.module.css";
import { useUserContext } from "../../UserContext";
import { socket } from "../../socket";

function MyBookings() {
  const { API_URL, user } = useUserContext();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function getBookings() {
      const res = await fetch(`${API_URL}/booking/${user._id}`);
      const { bookings: allBookings } = await res.json();
      setBookings(allBookings);
    }
    getBookings();
  }, []);

  useEffect(() => {
    function handleUpdate(newBooking) {
      if (newBooking) return;
    }

    function handleDelete(bookingId) {
      setBookings((bookings) => {
        bookings.forEach((booking, i) => {
          if (booking._id === bookingId) booking.splice(i, 1);
        });
        console.log(bookings);
        return bookings;
      });
    }

    socket.on("updated booking", handleUpdate);
    socket.on("deleted booking", handleDelete);
    return () => {
      socket.off("updated booking", handleUpdate);
      socket.off("deleted booking", handleDelete);
    };
  }, []);

  function handleStatusUpdate(queryObj) {
    socket.emit("update status", queryObj);
  }

  return (
    <section>
      <h1 className={styles.title}>
        <span>Bookings</span>
      </h1>
      {bookings.length ? (
        <div className={styles.bookingContainer}>
          {bookings.map((booking, i) => (
            <Booking
              booking={booking}
              handleStatusUpdate={handleStatusUpdate}
              key={i}
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
