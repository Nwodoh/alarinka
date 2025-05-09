import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "./socket";

export const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authUser, setAuthUser] = useState({ email: "", name: "" });
  const [places, setPlaces] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [ready, setReady] = useState(false);
  const [myListings, setMyListings] = useState([]);
  const [notificationIsActive, setNotificationIsActive] = useState({
    booking: false,
  });
  const allPerks = ["wifi", "parking", "tv", "pets", "food", "entrance"];
  const initialPlaceQuery = {
    query: "",
    perks: [],
    maxGuests: 0,
    maxPrice: 0,
  };
  const [searchPlaceQuery, setSearchPlaceQuery] = useState(initialPlaceQuery);

  const API_URL = "http://localhost:4000";

  useEffect(() => {
    async function getPlaces() {
      const res = await fetch(`${API_URL}/place`);
      const { places: allPlaces } = await res.json();
      setPlaces(allPlaces);
    }
    getPlaces();
  }, []);

  useEffect(() => {
    async function getUser() {
      if (user) return;
      try {
        const res = await fetch(`${API_URL}/user`, {
          method: "GET",
          credentials: "include",
        });
        const { user } = await res.json();
        setUser(user);
      } catch (err) {
        console.error("Error fetching profile:", err.message);
      } finally {
        setReady(true);
      }
    }

    async function getBookings() {
      const res = await fetch(`${API_URL}/booking/${user._id}`);
      const { bookings: allBookings } = await res.json();
      setBookings(allBookings);
      return allBookings;
    }

    async function getPayments() {
      const res = await fetch(`${API_URL}/booking/payments/${user._id}`);
      const { payments: allPayments } = await res.json();
      setPayments(allPayments);
      return allPayments;
    }

    async function fetchListings() {
      const res = await fetch(`${API_URL}/place/mine/${user._id}`);
      const { places: listings } = await res.json();
      setMyListings(listings);
    }

    function activateNotification() {
      const { booking: bookingIsActive } = notificationIsActive;
      const userId = user._id;
      if (!userId || bookingIsActive) return;
      socket.emit("activate bookings notification", userId);
      setNotificationIsActive((notifications) => {
        return { ...notifications, booking: true };
      });
    }

    getUser();
    if (user) {
      getBookings();
      fetchListings();
      getPayments();
      activateNotification();
    }
  }, [user]);

  useEffect(() => {
    function handleBookingUpdate(newBooking) {
      const bookingId = newBooking?._id;
      if (!bookingId) return;
      setBookings((bookings) =>
        bookings.map((booking) =>
          booking._id !== bookingId ? booking : newBooking
        )
      );
    }

    function handleUpdate(newBooking) {
      const bookingId = newBooking?._id;
      if (!bookingId) return;
      setPayments((bookings) =>
        bookings.map((booking) =>
          booking._id !== bookingId ? booking : newBooking
        )
      );
    }

    function handleDelete(bookingId) {
      if (!bookingId) return;
      setPayments((bookings) =>
        bookings.filter((booking) => booking._id !== bookingId)
      );
    }

    function handleBookingDelete(bookingId) {
      if (!bookingId) return;
      setBookings((bookings) =>
        bookings.filter((booking) => booking._id !== bookingId)
      );
    }

    function addNewBooking(newBooking) {
      setPayments((bookings) => {
        return [...bookings, newBooking];
      });
    }

    function updatePlaces(newPlace) {
      setPlaces((places) => [newPlace, ...places]);
    }
    function removePlace(deletedPlace) {
      if (!deletedPlace?._id) return;
      setPlaces((places) =>
        places.filter((place) => place._id !== deletedPlace._id)
      );
    }

    socket.on("updated booking", handleBookingUpdate);
    socket.on("updated payment", handleUpdate);
    socket.on("deleted booking", handleBookingDelete);
    socket.on("deleted payment", handleDelete);
    socket.on("my new booking", addNewBooking);
    socket.on("new update", updatePlaces);
    socket.on("new place delete", removePlace);
    return () => {
      socket.off("updated booking", handleBookingUpdate);
      socket.off("updated payment", handleUpdate);
      socket.off("deleted booking", handleBookingDelete);
      socket.off("deleted payment", handleDelete);
      socket.off("my new booking", addNewBooking);
      socket.off("new update", updatePlaces);
      socket.off("new place delete", removePlace);
    };
  }, []);

  useEffect(function () {}, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        authUser,
        setAuthUser,
        places,
        setPlaces,
        bookings,
        setBookings,
        payments,
        setPayments,
        myListings,
        setMyListings,
        ready,
        API_URL,
        notificationIsActive,
        setNotificationIsActive,
        searchPlaceQuery,
        setSearchPlaceQuery,
        allPerks,
        initialPlaceQuery,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("CityContext was used outside the CityProvider.");
  return context;
}
