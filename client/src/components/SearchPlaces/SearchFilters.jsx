import { useUserContext } from "../../UserContext";
import Icons from "../Icons/Icons";
import styles from "./SearchFilters.module.css";

function SearchFilters({ showFilters, onClick }) {
  const { allPerks, searchPlaceQuery, setSearchPlaceQuery } = useUserContext();
  const { perks: queryPerks, maxGuests, maxPrice } = searchPlaceQuery;

  return (
    <div
      className={`${styles.filterWrapper} ${
        showFilters ? styles.filterWrapperActive : ""
      }`}
      onClick={onClick}
    >
      <label htmlFor="price-filter" className={styles.filterItem}>
        <label htmlFor="price-filter">Max Price</label>
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
        <label htmlFor="guest-filter">Max Guests</label>
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
      <label className={`${styles.filterItem} max-w-none`}>
        <label htmlFor="perks-filter">Perks</label>
        <input type="hidden" id="perks-filter" />
        <div className={styles.perksWrapper}>
          {allPerks.map((perk) => {
            const isSelected = queryPerks.includes(perk);
            return (
              <span
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
              </span>
            );
          })}
        </div>
      </label>
    </div>
  );
}

export default SearchFilters;
