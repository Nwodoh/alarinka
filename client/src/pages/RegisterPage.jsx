import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../UserContext";
import PrimaryBtn from "../components/CtaBtn/PrimaryBtn";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setAuthUser, API_URL } = useUserContext();

  async function sendOtp(e) {
    e.preventDefault();
    if (isSubmitting) return;
    try {
      setIsSubmitting(true);
      await fetch(`${API_URL}/user/register/otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, email }),
      });

      setAuthUser((u) => ({ ...u, email, name }));
      navigate("/register/verify");
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grow flex flex-col items-center justify-around">
      <form className="mx-auto max-w-md -mt-8" onSubmit={sendOtp}>
        <h1 className="text-center text-4xl ">Register</h1>
        <input
          type="text"
          placeholder="Ajala Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <PrimaryBtn text="Register" isLoading={isSubmitting} />
        <div className="text-center p-2">
          Have an account?
          <Link className="text-secondary" to={"/login"}>
            Log In here
          </Link>
        </div>
      </form>
    </div>
  );
}
