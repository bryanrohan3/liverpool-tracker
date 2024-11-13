import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../utils/buttons.scss";

function Login() {
  const navigate = useNavigate();

  // Lock scrolling when the Login component is rendered
  useEffect(() => {
    // Check if the user is on mobile
    if (window.innerWidth <= 768) {
      // Lock scrolling by adding a class to the body
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none"; // Disable touch actions like scrolling or zooming
    }

    // Clean up when the component is unmounted (or if the user navigates away)
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, []); // Empty dependency array ensures this effect runs only once

  const handleLoginClick = () => {
    navigate("/home");
  };

  return (
    <div className="centre-screen">
      <p className="mb-30 bold fs-22">
        <span className="red">Red</span>
        <span className="route">Route</span>
        <span className="full-stop">.</span>
      </p>
      <input className="fs-14 input" type="text" placeholder="Username" />
      <input
        className="fs-14 mt-10 input"
        type="password"
        placeholder="Password"
      />
      <button
        className="mt-30 button button--primary"
        onClick={handleLoginClick}
      >
        Login
      </button>
    </div>
  );
}

export default Login;
