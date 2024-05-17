import { useEffect, useState } from "react";
import { useUserContext } from "../../UserContext";
import styles from "./MyListings.module.css";
import Listing from "./Listing";

function MyListings() {
  const { API_URL, user } = useUserContext();
  const [myListings, setMyListings] = useState([]);

  useEffect(() => {
    async function fetchListings() {
      const res = await fetch(`${API_URL}/place/mine/${user._id}`);
      const { places: listings } = await res.json();
      setMyListings(listings);
    }
    fetchListings();
  }, []);

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>
        <span>My Listings</span>
      </h1>
      {myListings.length ? (
        <div className={styles.listContainer}>
          {myListings.map((listing, i) => (
            <Listing listing={listing} key={i} />
          ))}
        </div>
      ) : (
        <h1 className={styles.title}>
          <span>No listing found. Use the Add button to create.</span>
        </h1>
      )}
    </section>
  );
}

export default MyListings;
