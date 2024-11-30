import { Link } from "react-router-dom";
import { useUserContext } from "../../UserContext";
import styles from "./Booking.module.css";
import BookingDates from "./BookingDates";
import { isFuture, startOfDay, addDays, isWithinInterval } from "date-fns";

function Booking({ booking }) {
  const { API_URL } = useUserContext();
  const {
    _id: bookingId,
    place,
    numGuests,
    numNights,
    totalPrice,
    createdAt,
    startDate = createdAt,
  } = booking;
  const today = startOfDay(new Date());
  const normalizedStartDate = startOfDay(new Date(startDate));
  const endDate = addDays(normalizedStartDate, numNights);
  const { hasStarted, isActive } = {
    hasStarted: !isFuture(new Date(startDate)),
    isActive: isWithinInterval(today, {
      start: normalizedStartDate,
      end: endDate,
    }),
  };
  const hasEnded = hasStarted && !isActive;
  let bookingStatus = booking.status === "accepted" ? "accepted" : "pending";
  const bookingState = (function () {
    if (hasEnded) return "ended";
    else if (!hasStarted) return bookingStatus;
    else if (hasStarted && bookingStatus !== "accepted") return "pending";
    else if (hasStarted && bookingStatus === "accepted") return "active";
  })();

  return (
    <div className={styles.booking}>
      <div
        style={{
          backgroundImage: `url(${API_URL}/images/${
            place.photos[0] || "uploads/default.jpg"
          })`,
        }}
        className={styles.picture}
      >
        <div className={styles.pictureOverlay}></div>
      </div>
      <div className={styles.detailContainer}>
        <div>
          <h3 className={styles.about}>
            You booked
            <Link to={`/places/${place?.slug}`}>
              <b> {place.title}</b>
            </Link>
          </h3>
          <div>
            <span
              className={`${styles[bookingStatus]} ${styles.status} ${
                isActive ? styles.isActive : ""
              } ${hasEnded ? styles.hasEnded : ""} capitalize mr-2`}
            >
              {bookingState}
            </span>
            <span
              className={`${styles[bookingStatus]} ${styles.status} ${
                isActive ? styles.isActive : ""
              } ${hasEnded ? styles.hasEnded : ""}`}
            >
              <BookingDates
                hasStarted={hasStarted}
                isActive={isActive}
                hasEnded={hasEnded}
                startDate={startDate}
                endDate={endDate}
              />
            </span>
          </div>
          <div>
            <div className={styles.pGap}>
              <span>
                {numGuests > 1 ? `You and ${numGuests - 1} others` : `Only you`}{" "}
                (${place.price}
                {numGuests > 1 ? " each" : ""}) for {numNights}{" "}
                {numNights > 1 ? "nights" : "night"}
              </span>
            </div>
            <div>
              <span>Total Price: </span>
              <span>
                <b>${totalPrice}</b>
              </span>
            </div>
          </div>
        </div>
        <div className={styles.ctaContainer}>
          <div>Booked on {new Date(createdAt).toDateString()}</div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
