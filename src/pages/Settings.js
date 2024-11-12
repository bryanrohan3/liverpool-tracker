import React from "react";
import { FaUser } from "react-icons/fa";
import "../utils/margins.scss";

function Settings() {
  return (
    <div>
      <h1 className="h1 mt-30 ml-30">Settings Page</h1>{" "}
      <div className="ml-30 flex-row align-center">
        <FaUser />
        <p className="fs-14 ml-10">Account Information</p>
      </div>
      <div>
        {/* First Name */}
        <input
          className="fs-14 ml-30 input"
          type="text"
          placeholder="First Name"
        />

        {/* Last Name */}
        <input
          className="fs-14 ml-30 mt-30 input"
          type="text"
          placeholder="Last Name"
        />

        {/* Username */}
        <input
          className="fs-14 ml-30 mt-30 input"
          type="text"
          placeholder="Username"
        />

        {/* Email */}
        <input
          className="fs-14 ml-30 mt-30 input"
          type="email"
          placeholder="Email"
        />

        {/* Password */}
        <input
          className="fs-14 ml-30 mt-30 input"
          type="password"
          placeholder="Password"
        />

        {/* Confirm Password */}
        <input
          className="fs-14 ml-30 mt-30 input"
          type="password"
          placeholder="Confirm Password"
        />

        {/* Save Button */}
        <button className="ml-30 mt-30 fs-14">Save</button>
      </div>
    </div>
  );
}

export default Settings;
