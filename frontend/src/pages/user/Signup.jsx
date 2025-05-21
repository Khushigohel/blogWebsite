import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function Signup({ openLogin }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // ✅ Full name validation
    const namePattern = /^[A-Za-z ]+$/;
    if (!namePattern.test(formData.fullName)) {
      alert("Full Name should only contain letters and spaces.");
      return;
    }

    // ✅ Password pattern validation
    // const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/;
    // if (!passwordPattern.test(formData.password)) {
    //   alert("Password must be at least 6 characters, include a number and a special character.");
    //   return;
    // }

    // ✅ Password match check
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ " + data.message);
        openLogin(); // Switch to login modal
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("⚠️ Server error");
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input
        className="input-field"
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        pattern="^[A-Za-z ]+$"
        title="Full Name should only contain letters and spaces"
        required
      />
      <input
        className="input-field"
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        className="input-field"
        type="password"
        name="password"
        placeholder="Create Password"
        value={formData.password}
        onChange={handleChange}
        // pattern="^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$"
        // title="At least 6 characters, include a number and a special character"
        required
      />
      <input
        className="input-field"
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />
      <button className="auth-button" type="submit">Register Now</button>
      <center>
        <p>
          <button type="button" onClick={openLogin} style={{ background: "none", border: "none", color: "blue" }}>
      Already a member? Login
    </button>
        </p>
      </center>
    </form>
  );
}