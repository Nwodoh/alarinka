import { useState } from "react";
import { useUserContext } from "../UserContext";
import { Link, useNavigate } from "react-router-dom";
import PrimaryBtn from "../components/CtaBtn/PrimaryBtn";

function VerifyUser() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    authUser: { name, email },
    setUser,
    API_URL,
  } = useUserContext();

  async function registerUser(ev) {
    ev.preventDefault();
    if (isSubmitting) return;
    try {
      setIsSubmitting(true);
      const res = await fetch(`${API_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, email, password: newPassword, otp }),
      });
      const { status, message, user } = await res.json();

      if (status !== "success") throw new Error(message);
      setUser(user);
      alert("Registration successful. Welcome to Alarinka 🎉.");
      navigate("/");
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grow flex flex-col items-center justify-around">
      <form className="mx-auto max-w-md -mt-8" onSubmit={registerUser}>
        <h1 className="text-center text-4xl ">Email Verification</h1>
        <p className="mt-3">We sent a six digit otp to your email: {email}</p>
        <input
          type="text"
          placeholder="Six digit otp"
          className="min-w-[45vw]"
          value={otp}
          maxLength={6}
          onChange={(e) =>
            setOtp((otp) =>
              !isNaN(Number(e.target.value)) ? e.target.value : otp
            )
          }
          required
        />
        <input
          type="password"
          minLength={5}
          maxLength={20}
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          minLength={5}
          maxLength={20}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <PrimaryBtn text="Verify Email" isLoading={isSubmitting} />
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

export default VerifyUser;
