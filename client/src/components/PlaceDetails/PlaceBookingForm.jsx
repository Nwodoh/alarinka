import { useState } from "react";
import { useTimeManager } from "../../hooks/useTimeManager";
import Icons from "../Icons/Icons";
import styles from "./PlaceBookingForm.module.css";

function PlaceBookingForm({ maxGuests, price, handleBookPlace, checkIn }) {
  const [numGuests, setNumGuests] = useState(1);
  const [numNights, setNumNights] = useState(1);
  const [startDate, setStartDate] = useState(
    useTimeManager({ type: "formatDateForInput", value: new Date() })
  );
  const totalPrice = price * numGuests * numNights;
  const checkInTime = useTimeManager({ type: "numberToTime", value: checkIn });
  const minNightsAndGuests = 1;
  const maxNights = 365;

  function handleSubmit(e) {
    e.preventDefault();
    handleBookPlace({ numNights, startDate: new Date(startDate), numGuests });
  }

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <div className={styles.iconInputWrapper}>
          <div className={styles.iconInput}>
            <div className={styles.iconWrapper}>
              <Icons type="night" />
            </div>
            <div className={styles.inputLabelWrapper}>
              <label htmlFor="numNights">
                Number of nights (Max {maxNights})
              </label>
              <input
                type="Number"
                value={numNights}
                id="numNights"
                min={minNightsAndGuests}
                max={maxNights}
                onChange={(e) => setNumNights(e.target.value)}
                required
              />
            </div>
          </div>
          <div className={styles.iconInput}>
            <div className={styles.iconWrapper}>
              <Icons type="group" />
            </div>
            <div className={styles.inputLabelWrapper}>
              <label htmlFor="numNights">
                Number of Guests (Max {maxGuests})
              </label>
              <input
                type="Number"
                value={numGuests}
                id="numNights"
                min={minNightsAndGuests}
                max={maxGuests}
                onChange={(e) => setNumGuests(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <div className={styles.inputLabelWrapper}>
          <label htmlFor="startDate">
            When will you arrive? (opens @{checkInTime})
          </label>
          <input
            type="date"
            min={useTimeManager({
              type: "formatDateForInput",
              value: new Date(),
            })}
            value={startDate}
            id="startDate"
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
      </div>
      <div>
        <div className={styles.totalPrice}>
          <h1 className={styles.title}>
            <span>Total Price:</span>
          </h1>
          <span>${totalPrice || 0}</span>
        </div>
      </div>
      <button className={styles.cta}>Pay</button>
    </form>
  );
}

export default PlaceBookingForm;
