import { useState } from "react";
import Icons from "../Icons/Icons";
import styles from "./SearchPlaces.module.css";
import { useUserContext } from "../../UserContext";
import SearchFilters from "./SearchFilters";

function SearchPlaces() {
  const { searchPlaceQuery, setSearchPlaceQuery, initialPlaceQuery } =
    useUserContext();
  const { query } = searchPlaceQuery;
  const [isFocused, setIsFocused] = useState(!!query);

  return (
    <div className="relative">
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
          onFocus={() => setIsFocused(true)}
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
      <SearchFilters
        showFilters={isFocused}
        onClick={() => setIsFocused(true)}
      />
    </div>
  );
}

export default SearchPlaces;
