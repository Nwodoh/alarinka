import { useState } from "react";
import Icons from "../Icons/Icons";
import styles from "./SearchPlaces.module.css";
import { useUserContext } from "../../UserContext";
import SearchFilters from "./SearchFilters";

function SearchPlaces() {
  const { searchPlaceQuery, setSearchPlaceQuery, initialPlaceQuery } =
    useUserContext();
  const { query, perks, maxGuests, maxPrice } = searchPlaceQuery;
  const shouldBeShown = !!query || !!perks?.length || !!maxGuests || !!maxPrice;
  const [isFocused, setIsFocused] = useState(shouldBeShown);

  return (
    <div
      className="relative"
      tabIndex={0}
      onFocus={() => setIsFocused(true)}
      onBlur={() => {
        setIsFocused(shouldBeShown);
        console.log("BLURRED");
      }}
    >
      <div
        className={`${styles.inputWrapper} ${
          isFocused ? styles.inputWrapperFocused : ""
        }`}
      >
        <label htmlFor="search-places" className={styles.searchLabel}>
          <Icons type="search place" />
        </label>
        <input
          type="text"
          name="searchPlaces"
          id="search-places"
          className={styles.searchInput}
          value={searchPlaceQuery.query}
          onChange={(e) =>
            setSearchPlaceQuery((queryObj) => ({
              ...queryObj,
              query: e.target.value,
            }))
          }
          placeholder="Search for places"
        />
        <div
          className={styles.closeInput}
          onClick={() => {
            setSearchPlaceQuery(() => initialPlaceQuery);
            setIsFocused(false);
          }}
        >
          <span>&times;</span>
        </div>
      </div>
      <SearchFilters showFilters={isFocused} />
    </div>
  );
}

export default SearchPlaces;
