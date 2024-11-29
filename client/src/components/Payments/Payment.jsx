import { Link } from "react-router-dom";
import { useUserContext } from "../../UserContext";
import styles from "./Payment.module.css";

function Payment({ payment, handleStatusUpdate }) {
  const { API_URL } = useUserContext();
  const {
    _id: paymentId,
    place,
    booker,
    createdAt,
    numGuests,
    totalPrice,
  } = payment;
  let paymentStatus = payment.status === "accepted" ? "accepted" : "pending";

  return (
    <div className={styles.payment}>
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
            {booker.name.split(" ")[0]} booked
            <Link to={`/places/${place?.slug}`}>
              <b> {place.title}</b>
            </Link>
          </h3>
          <span className={`${styles[paymentStatus]} ${styles.status}`}>
            {paymentStatus}
          </span>
          <p className={styles.pGap}>
            <span>
              <span>Guests: </span>
              <span>x{numGuests}</span>
            </span>
            <span>
              <span>Total Price: </span>
              <span>${totalPrice}</span>
            </span>
          </p>
        </div>
        <div className={styles.ctaContainer}>
          <div>Booked on {new Date(createdAt).toDateString()}</div>
          <div>
            {paymentStatus !== "accepted" ? (
              <>
                <button
                  onClick={() =>
                    handleStatusUpdate({
                      status: "decline",
                      bookingId: paymentId,
                    })
                  }
                  className={`${styles.cta} ${styles.ctaPending}`}
                >
                  Decline
                </button>
                <button
                  onClick={() =>
                    handleStatusUpdate({
                      status: "accepted",
                      bookingId: paymentId,
                    })
                  }
                  className={styles.cta}
                >
                  Accept
                </button>
              </>
            ) : (
              <button
                onClick={() =>
                  handleStatusUpdate({ status: "delete", bookingId: paymentId })
                }
                className={`${styles.cta} ${styles.ctaDelete}`}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
