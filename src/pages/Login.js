import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../helper/axiosHelper"; // Import login endpoint
import "../utils/buttons.scss";
import "../utils/fonts.scss";

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
      localStorage.setItem("userToken", data.token);
      setError(null);
      navigate("/home");
    } catch (err) {
      setError("Incorrect username or password.");
    }
  };

  const handleSignupRedirect = () => {
    navigate("/signup"); // Redirect to the signup page
  };

  return (
    <div className="centre-screen">
      <p className="mb-30 bold fs-22">
        <span className="red">Red</span>
        <span className="route">Route</span>
        <span className="full-stop">.</span>
      </p>
      <input
        className="fs-14 login-input"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="fs-14 mt-10 login-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="error-message fs-12">{error}</p>}
      <button
        className="mt-30 button button--primary fw-400"
        onClick={handleLogin}
      >
        Login
      </button>
      <p className="mt-20 fs-14">
        Don't have an account?{" "}
        <button className="button button--link" onClick={handleSignupRedirect}>
          Sign Up
        </button>
      </p>
    </div>
  );
}

export default Login;
