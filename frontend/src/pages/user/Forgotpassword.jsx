import { useState } from "react";

export default function ForgotPassword({ openLogin }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const requestOtp = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/request-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.msg || "Something went wrong");
      } else {
        setMessage(data.msg);
        setOtpSent(true);
      }
    } catch {
      setError("Server error. Please try again.");
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/reset-password-with-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.msg || "Something went wrong");
      } else {
        setMessage(data.msg);
        setEmail("");
        setOtp("");
        setNewPassword("");
        setOtpSent(false);
      }
    } catch {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div>
      {!otpSent ? (
        <form onSubmit={requestOtp}>
          <input
            className="input-field"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          {message && <p style={{ color: "green" }}>{message}</p>}
          <button className="auth-button" type="submit">
            Send OTP
          </button>
          <p>
            <button
              type="button"
              onClick={openLogin}
              style={{ background: "none", border: "none", color: "blue" }}
            >
              Back to Login
            </button>
          </p>
        </form>
      ) : (
        <form onSubmit={resetPassword}>
          <input
            className="input-field"
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <input
            className="input-field"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          {message && <p style={{ color: "green" }}>{message}</p>}
          <button className="auth-button" type="submit">
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
}
