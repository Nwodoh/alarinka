import { Link } from "react-router-dom";
import { useUserContext } from "../../UserContext";
import styles from "./Profile.module.css";
import Icons from "../Icons/Icons";

function Profile({ setRedirect }) {
  const { user, setUser, API_URL, bookings, payments, myListings } =
    useUserContext();
  const { name, email } = user;

  async function logout() {
    await fetch(`${API_URL}/user/logout`, {
      method: "GET",
      credentials: "include",
    });
    setUser(null);
    setRedirect("/");
  }

  return (
    <div
      className={`${styles.profile} text-center mx-auto w-[100%] max-w-[600px]`}
    >
      <div className="flex flex-col mt-5 mb-5">
        <div className={styles.imageWrapper}>
          <span></span>
          <h1 className={styles.title}>
            <span>ALARINKA™</span>
          </h1>
          <img
            src="http://localhost:4000/images/uploads/default.jpg"
            className="object-cover w-[100%] h-[15vw]"
            alt=""
          />
        </div>
        <div className="flex justify-around mt-6 text-[16px] font-medium text-accent-secondary bg-accent-secondary-light border border-accent-secondary capitalize px-[4px] py-[3px] rounded-md">
          <Link to={"./bookings"} className="flex gap-1 items-center">
            <Icons type="booking" iconClasses={"fill-accent-secondary"} />
            <span>{bookings?.length}</span>
            <span>Bookings</span>
          </Link>
          <Link to={"./payments"} className="flex gap-1 items-center">
            <Icons type="dollar" iconClasses={"fill-accent-secondary"} />
            <span>{payments?.length}</span>
            <span>payments</span>
          </Link>
          <Link to={"./places"} className="flex gap-1 items-center">
            <Icons type="gallery" iconClasses={"fill-accent-secondary"} />
            <span>{myListings?.length}</span>
            <span>Listings</span>
          </Link>
        </div>
        <div className="flex mt-6 gap-3 items-center">
          <div className="flex items-center justify-center w-[8vw] h-[8vw] min-w-[65px] min-h-[65px] bg-primary_light text-primary rounded-full text-4xl uppercase">
            <h1>
              {name[0]}
              {name?.split(" ")[1]?.[0] || name[1]}
            </h1>
          </div>
          <div className="flex flex-col justify-between flex-wrap flex-grow gap-3">
            <input
              type="name"
              className="border-none bg-primary_light text-primary"
              defaultValue={name}
              disabled
            />
            <input
              type="email"
              className="border-none bg-primary_light text-primary"
              defaultValue={email}
              disabled
            />
            <input
              type="password"
              className="border-none bg-primary_light text-primary"
              defaultValue={"****"}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="max-w-lg mx-auto">
        Logged in as {name} ({email}) <br />
        <button className="primary" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
