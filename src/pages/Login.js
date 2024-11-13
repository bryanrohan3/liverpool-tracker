// Login.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../helper/axiosHelper"; // Import login endpoint
import "../utils/buttons.scss";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, []);

  const handleLogin = async () => {
    try {
      const data = await endpoints.login(username, password);
      localStorage.setItem("userToken", data.token); // Save token in localStorage
      setError(null);
      navigate("/home"); // Navigate to home on success
    } catch (err) {
      setError("Incorrect username or password.");
    }
  };

  return (
    <div className="centre-screen">
      <p className="mb-30 bold fs-22">
        <span className="red">Red</span>
        <span className="route">Route</span>
        <span className="full-stop">.</span>
      </p>
      <input
        className="fs-14 input"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="fs-14 mt-10 input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="error-message fs-12">{error}</p>}{" "}
      <button className="mt-30 button button--primary" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;
