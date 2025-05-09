import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../UserContext";
import { useState } from "react";
import PrimaryBtn from "../components/CtaBtn/PrimaryBtn";

function ForgotPassword() {
  const { setAuthUser, API_URL } = useUserContext();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleGetOtp(e) {
    e.preventDefault();
    if (isSubmitting) return;
    try {
      setIsSubmitting(true);
      await fetch(`${API_URL}/user/register/otp?otpType=password_reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email }),
      });

      setAuthUser((u) => ({ ...u, email }));
      navigate("/forgot-password/reset");
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grow flex flex-col items-center justify-around">
      <form className="mx-auto max-w-md -mt-8" onSubmit={handleGetOtp}>
        <h1 className="text-center text-4xl">Forgot Password</h1>
        <p className="mt-3">We would send a six digit otp to your email</p>
        <input
          type="email"
          placeholder="your@email.com"
          className="min-w-[45vw]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Link
          to="/forgot-password/reset"
          className="block underline text-stone-600/70 mb-3"
        >
          Already have an otp?
        </Link>
        <PrimaryBtn text="Send OTP" isLoading={isSubmitting} />
        <div className="text-center p-2">
          {"No account? "}
          <Link className="text-secondary" to={"/register"}>
            Register here
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
