import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const LoginAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Send POST request to your backend route
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password })
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message || "Login successful!");
        
        // Example: Redirect to dashboard

        if (response.ok) {
          localStorage.setItem("isAdminLoggedIn", "true");
          navigate("/admin/dashboard");
        }
      } else {
        alert(data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error during admin login:", error);
      alert("Server error - check console.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Section */}
        <div className="login-left">
          <h2>Dashboard</h2>
          <p>Welcome Blog Admin Dashboard. Enter your UserName and Password to access your admin Account.</p>
        </div>

        {/* Right Section (Login Form) */}
        <div className="login-right">
          <form onSubmit={handleSubmit} className="login-form">
            <label>Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="login-btn" type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
