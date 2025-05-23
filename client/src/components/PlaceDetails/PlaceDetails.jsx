import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./PlaceDetails.module.css";
import { useUserContext } from "../../UserContext";
import PlaceDetailsHeader from "./PlaceDetailsHeader";
import PlaceDetailsDescription from "./PlaceDetailsDescription";
import PlaceDetailsImages from "./PlaceDetailsImages";
import { socket } from "../../socket";
import Modal from "../Modal/Modal";
import PlaceBookingForm from "./PlaceBookingForm";

function PlaceDetails() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { API_URL, user, setBookings } = useUserContext();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [place, setPlace] = useState({ photos: [], perks: [], owner: {} });

  useEffect(() => {
    async function getPlace() {
      try {
        const res = await fetch(`${API_URL}/place/detail/${slug}`);
        const { place: placeData, status } = await res.json();
        if (status !== "success") throw new Error("Place Not Found");
        setPlace(placeData);
      } catch (err) {
        console.log(err);
        alert(err.message);
      }
    }

    getPlace();
  }, []);

  useEffect(() => {
    function handleBookingError(err) {
      alert(err.message);
    }
    function handlePlaceBooked(data) {
      alert(data.message);
      setBookings((bookings) => [...bookings, data.newBooking]);
    }

    socket.on("create booking error", handleBookingError);
    socket.on("place booked", handlePlaceBooked);

    return () => {
      socket.off("create booking error", handleBookingError);
      socket.off("place booked", handlePlaceBooked);
    };
  }, []);

  function handleBookPlace(bookingData) {
    const bookerId = user?._id;
    if (!bookerId) {
      alert("Log in to book this place!.");
      navigate("/login");
      return;
    }
    socket.emit("create booking", {
      place,
      owner,
      user,
      bookingData,
    });
    setModalIsOpen(false);
  }

  if (!place?._id)
    return (
      <h1 className={styles.title}>
        <span>Could not find {slug?.replaceAll?.("-", " ")} on our server</span>
      </h1>
    );

  const {
    title,
    owner,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
    _id: placeId,
  } = place;

  return (
    <div>
      {modalIsOpen && (
        <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
          <PlaceBookingForm
            price={price}
            maxGuests={maxGuests}
            handleBookPlace={handleBookPlace}
            checkIn={checkIn}
          />
        </Modal>
      )}
      <PlaceDetailsHeader
        title={title}
        address={address}
        maxGuests={maxGuests}
        mainImg={photos[0]}
        checkIn={checkIn}
        checkOut={checkOut}
        owner={owner}
        price={price}
        setModalIsOpen={setModalIsOpen}
      />
      <PlaceDetailsDescription
        title={title}
        description={description}
        extraInfo={extraInfo}
        perks={perks}
        owner={owner}
        checkIn={checkIn}
        checkOut={checkOut}
        price={price}
        setModalIsOpen={setModalIsOpen}
      />
      <PlaceDetailsImages photos={photos} />
    </div>
  );
}

export default PlaceDetails;
