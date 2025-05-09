import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../UserContext";
import { useState } from "react";
import PrimaryBtn from "../components/CtaBtn/PrimaryBtn";

function ResetPassword() {
  const navigate = useNavigate();
  const {
    authUser: { email },
    setAuthUser,
    setUser,
    API_URL,
  } = useUserContext();
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleGetOtp(e) {
    e.preventDefault();
    if (isSubmitting) return;
    try {
      setIsSubmitting(true);
      const res = await fetch(`${API_URL}/user/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password: newPassword,
          passwordConfirm: confirmPassword,
          otp,
        }),
      });
      const { status, message, user } = await res.json();

      if (status !== "success") throw new Error(message);
      setUser(user);
      setAuthUser((u) => ({ ...u, name: "", email: "" }));
      alert("Your password was changed. Welcome back.");
      navigate("/");
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grow flex flex-col items-center justify-around">
      <form className="mx-auto max-w-md -mt-8" onSubmit={handleGetOtp}>
        <h1 className="text-center text-4xl">Reset Password</h1>
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
        <Link
          to="/forgot-password"
          className="block underline text-stone-600/70 mb-3"
        >
          Don't have an OTP yet?
        </Link>
        <PrimaryBtn text="Password" isLoading={isSubmitting} />
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

export default ResetPassword;
