import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthContext";

export default function Login({ openSignup, openForgot,onLoginSuccess }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("" + data.message);
        login();
        onLoginSuccess(); // 👈 callback to go to details
        navigate("/");

      } else {
        alert("" + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };
  

  return (
    <form onSubmit={handleLogin}>
      <input className="input-field" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input className="input-field" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button className="auth-button" type="submit">Login</button>
      
      {/* 🔹 Fix: Prevent Redirect & Switch Modals Correctly */}
      <center>
  <p>
    <button type="button" onClick={openSignup} style={{ background: "none", border: "none", color: "blue" }}>
      Don't have an account? Sign Up
    </button>
  </p>
  <p>
    <button type="button" onClick={openForgot} style={{ background: "none", border: "none", color: "blue" }}>
      Forgot Password?
    </button>
  </p>
</center>

    </form>
  );
}
