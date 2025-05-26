import { useState } from "react";

export default function ForgotPassword({ openLogin }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // Step 1: Request OTP
  const requestOtp = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      // const res = await fetch("http://localhost:5000/api/request-reset", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email }),
      // });
      const res= await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }) 
        ,
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
    setLoading(false);
  };

  // Step 2: Reset Password using OTP
  const resetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();

      console.log("RESET RESPONSE:", data);
      
      if (!res.ok) {
        setError(data.msg || "Something went wrong");
      } else {
        setMessage(data.msg);
        setEmail("");
        setOtp("");
        setNewPassword("");
        setOtpSent(false);

        // Optional: Auto go back to login after success
        setTimeout(() => {
          openLogin(); // Show login form again
        }, 2000);
      }
    } catch {
      setError("Server error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "1rem" }}>
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
          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send OTP"}
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
          <h2>Reset Password</h2>
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
          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      )}
    </div>
  );
}
