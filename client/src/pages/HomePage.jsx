import { socket } from "../socket";
import styles from "./HomePage.module.css";
import PlaceCard from "../components/PlaceCard/PlaceCard";
import { useEffect, useState } from "react";
import { useUserContext } from "../UserContext";

const HomePage = () => {
  const { places, searchPlaceQuery } = useUserContext();
  const {
    query,
    maxPrice: queryPrice,
    perks: queryPerks,
    maxGuests: queryGuests,
  } = searchPlaceQuery;

  const usePlacesToShow = query || queryPrice || queryGuests || queryPerks;

  const placesToShow = usePlacesToShow
    ? places?.filter?.((place) => {
        const {
          title = "",
          name = "",
          description = "",
          address = "",
          perks = [],
          price = 0,
          maxGuests = 1,
        } = place || {};
        const matchesQuery =
          title.toLowerCase().includes(query.toLowerCase()) ||
          name.toLowerCase().includes(query.toLowerCase()) ||
          address.toLowerCase().includes(query.toLowerCase()) ||
          description.toLowerCase().includes(query.toLowerCase());
        const matchesPrice = queryPrice ? queryPrice >= price : true;
        const matchesGuest = queryGuests ? queryGuests >= maxGuests : true;
        const matchesPerks = queryPerks
          ? queryPerks.every((perk) => perks.includes(perk))
          : true;

        return matchesQuery && matchesPrice && matchesGuest && matchesPerks;
      })
    : places;

  return (
    <>
      <h1 className={styles.title}>
        <span>Available around you</span>
      </h1>
      <div className={styles.cardsContainer}>
        {placesToShow.map((place) => {
          return <PlaceCard place={place} key={place._id} />;
        })}
      </div>
    </>
  );
};

export default HomePage;
