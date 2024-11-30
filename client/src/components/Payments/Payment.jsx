import { Link } from "react-router-dom";
import { useUserContext } from "../../UserContext";
import styles from "./Payment.module.css";
import { useEffect, useState } from "react";
import { socket } from "../../socket";

function Payment({ payment, handleStatusUpdate }) {
  const { API_URL } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const {
    _id: paymentId,
    place,
    booker,
    createdAt,
    numGuests,
    numNights,
    totalPrice,
  } = payment;
  let paymentStatus = payment.status === "accepted" ? "accepted" : "pending";

  function handleUpdateAndIsLoading({ status, bookingId }) {
    handleStatusUpdate({
      status,
      bookingId,
    });

    if (status !== "accepted") setIsLoading(true);
    else setIsAccepting(true);
  }

  useEffect(function () {
    function resetStates() {
      setIsAccepting(false);
      setIsLoading(false);
    }
    socket.on("updated payment", resetStates);
    socket.on("deleted payment", resetStates);
    socket.on("declined payment", resetStates);
    return () => {
      socket.off("updated payment", resetStates);
      socket.off("declined payment", resetStates);
      socket.off("deleted payment", resetStates);
    };
  }, []);

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
          <div>
            <div className={styles.pGap}>
              <span>
                Guests: x{numGuests} (${place.price} each)
              </span>
              <span>Nights: x{numNights}</span>
            </div>
            <div>
              <span>Total Price: </span>
              <span>${totalPrice}</span>
            </div>
          </div>
        </div>
        <div className={styles.ctaContainer}>
          <div>Booked on {new Date(createdAt).toDateString()}</div>
          <div>
            {paymentStatus !== "accepted" ? (
              <>
                <button
                  onClick={() =>
                    handleUpdateAndIsLoading({
                      status: "decline",
                      bookingId: paymentId,
                    })
                  }
                  disabled={isLoading}
                  className={`${styles.cta} ${styles.ctaPending}`}
                >
                  Decline
                </button>
                <button
                  onClick={() =>
                    handleUpdateAndIsLoading({
                      status: "accepted",
                      bookingId: paymentId,
                    })
                  }
                  disabled={isLoading || isAccepting}
                  className={styles.cta}
                >
                  Accept
                </button>
              </>
            ) : (
              <button
                onClick={() =>
                  handleUpdateAndIsLoading({
                    status: "delete",
                    bookingId: paymentId,
                  })
                }
                disabled={isLoading}
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
