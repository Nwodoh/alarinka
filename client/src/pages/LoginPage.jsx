import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import PrimaryBtn from "../components/CtaBtn/PrimaryBtn";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, API_URL } = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    if (isSubmitting) return;
    try {
      setIsSubmitting(true);
      const res = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const { status, user, message } = await res.json();
      if (status !== "success") throw new Error(message);
      setUser(user);
      setRedirect(true);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="grow flex flex-col items-center justify-around">
        <form className="mx-auto max-w-md -mt-8" onSubmit={handleLoginSubmit}>
          <h1 className="text-center text-4xl ">Login</h1>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            required
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            required
          />
          <Link
            to="/forgot-password"
            className="block underline text-stone-600/70 mb-3"
          >
            Forgot your password? Click here to reset it.
          </Link>
          <PrimaryBtn text="Login" isLoading={isSubmitting} />
          <div className="text-center p-2">
            No account?{" "}
            <Link className="text-secondary" to={"/register"}>
              Register here
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
