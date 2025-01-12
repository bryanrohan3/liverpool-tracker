import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "../utils/margins.scss";
import "../utils/fonts.scss";

function Settings() {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogout = () => {
    // Remove the token from localStorage to log out the user
    localStorage.removeItem("userToken");

    // Redirect to the home page (login page)
    navigate("/");
  };

  return (
    <div>
      <h1 className="h1 mt-30 ml-30">Settings Page</h1>
      <div className="ml-30 flex-row align-center">
        {/* <FaUser /> */}
        {/* <p className="fs-14 ml-10">Account Information</p> */}
      </div>
      <div>
        {/* First Name */}
        <input
          className="fs-14 ml-30 login-input"
          type="text"
          placeholder="First Name"
        />

        {/* Last Name */}
        <input
          className="fs-14 ml-30 mt-10 login-input"
          type="text"
          placeholder="Last Name"
        />

        {/* Username */}
        <input
          className="fs-14 ml-30 mt-10 login-input"
          type="text"
          placeholder="Username"
        />

        {/* Email */}
        <input
          className="fs-14 ml-30 mt-10 login-input"
          type="email"
          placeholder="Email"
        />

        {/* Password */}
        <input
          className="fs-14 ml-30 mt-10 login-input"
          type="password"
          placeholder="Password"
        />

        {/* Confirm Password */}
        <input
          className="fs-14 ml-30 mt-10 login-input"
          type="password"
          placeholder="Confirm Password"
        />

        {/* Save Button */}
        <button className="button button--tertiary mt-20 ml-30">Save</button>
      </div>

      {/* Logout Button */}
      <p className="fs-14 bold mt-30 ml-30">Other</p>
      <button
        className="button button--tertiary ml-30 bottom"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Settings;
