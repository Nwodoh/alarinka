import { useUserContext } from "../../UserContext";
import Icons from "../Icons/Icons";
import styles from "./SearchFilters.module.css";

function SearchFilters({ showFilters }) {
  const { allPerks, searchPlaceQuery, setSearchPlaceQuery } = useUserContext();
  const { perks: queryPerks, maxGuests, maxPrice } = searchPlaceQuery;

  return (
    <div
      className={`${styles.filterWrapper} ${
        showFilters ? styles.filterWrapperActive : ""
      }`}
    >
      <label className={styles.filterItem}>
        <p>Max Price</p>
        <input
          type="number"
          name="priceFilter"
          id="price-filter"
          placeholder="$"
          min={0}
          defaultValue={""}
          value={maxPrice?.replace?.(/^0+/, "")}
          onChange={(e) =>
            setSearchPlaceQuery((queryObj) => ({
              ...queryObj,
              maxPrice: Number(e.target.value),
            }))
          }
        />
      </label>
      <label className={styles.filterItem}>
        <p>Max Guests</p>
        <input
          type="number"
          name="guestFilter"
          id="guest-filter"
          placeholder="∞"
          min={0}
          value={maxGuests?.replace?.(/^0+/, "")}
          onChange={(e) =>
            setSearchPlaceQuery((queryObj) => ({
              ...queryObj,
              maxGuests: Number(e.target.value),
            }))
          }
        />
      </label>
      <label
        htmlFor="no-filter-perks"
        className={`${styles.filterItem} max-w-none`}
      >
        <p>Perks</p>
        <div className={styles.perksWrapper}>
          {allPerks.map((perk) => {
            const isSelected = queryPerks.includes(perk);
            return (
              <button
                key={perk}
                className={isSelected ? styles.perkActive : ""}
                onClick={() =>
                  setSearchPlaceQuery((queryObj, perks = queryObj.perks) => ({
                    ...queryObj,
                    perks: perks.includes(perk)
                      ? perks.filter((el) => el !== perk)
                      : [...queryObj.perks, perk],
                  }))
                }
              >
                <Icons type={perk} />
              </button>
            );
          })}
        </div>
      </label>
    </div>
  );
}

export default SearchFilters;
