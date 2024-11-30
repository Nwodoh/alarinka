import styles from "./Payments.module.css";
import { useUserContext } from "../../UserContext";
import { socket } from "../../socket";
import Payment from "./Payment";

function Payments() {
  const { payments } = useUserContext();
  const { acceptedEarnings, pendingEarnings, totalEarnings } = payments.reduce(
    (acc, payment) => {
      acc.totalEarnings += payment.totalPrice;
      if (payment.status === "accepted")
        acc.acceptedEarnings += payment.totalPrice;
      else acc.pendingEarnings += payment.totalPrice;
      return acc;
    },
    { acceptedEarnings: 0, pendingEarnings: 0, totalEarnings: 0 }
  );

  function handleStatusUpdate(queryObj) {
    socket.emit("update booking status", queryObj);
  }

  return (
    <section>
      <div className={styles.heading}>
        <h1 className={styles.title}>
          <span>Payments</span>
        </h1>
      </div>
      {payments?.length ? (
        <div>
          <div className={styles.paymentContainer}>
            {payments
              .slice()
              .reverse()
              .map((payment, i) => (
                <Payment
                  payment={payment}
                  handleStatusUpdate={handleStatusUpdate}
                  key={i}
                />
              ))}
          </div>
          <div className={styles.earnings}>
            <div className={styles.totalEarnings}>
              <h1 className={styles.title}>
                <span>Total earnings:</span>
              </h1>
              <span>${totalEarnings || 0}</span>
            </div>
            <div className={styles.earningList}>
              <h1>Accepted Earnings: </h1>
              <span>${acceptedEarnings}</span>
            </div>
            <div className={styles.earningList}>
              <h1>Pending Earnings: </h1>
              <span>${pendingEarnings}</span>
            </div>
          </div>
        </div>
      ) : (
        <h1 className={styles.title}>
          <span>No Payments Yet...</span>
        </h1>
      )}
    </section>
  );
}

export default Payments;
