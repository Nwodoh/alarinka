import { socket } from "../socket";
import styles from "./HomePage.module.css";
import PlaceCard from "../components/PlaceCard/PlaceCard";
import { useEffect, useState } from "react";
import { useUserContext } from "../UserContext";

const HomePage = () => {
  const { places, setPlaces } = useUserContext();

  return (
    <>
      <h1 className={styles.title}>
        <span>Available around you</span>
      </h1>
      <div className={styles.cardsContainer}>
        {places.map((place) => {
          return <PlaceCard place={place} key={place._id} />;
        })}
      </div>
    </>
  );
};

export default HomePage;
