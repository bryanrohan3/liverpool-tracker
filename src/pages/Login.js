import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "../utils/buttons.scss";

function Login() {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLoginClick = () => {
    // Navigate to the /home route when the button is clicked
    navigate("/home");
  };

  return (
    <div className="centre-screen">
      <p className="mb-30 bold fs-22">
        <span className="red">Red</span>
        <span className="route">Route</span>
        <span className="full-stop">.</span>
      </p>
      <input className="fs-14  input" type="text" placeholder="Username" />
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

      {/* Button to navigate */}
    </div>
  );
}

export default Login;
