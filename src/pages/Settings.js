import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { endpoints } from "../helper/axiosHelper"; // Import the endpoints object
import "../utils/margins.scss";
import "../utils/fonts.scss";

function Settings() {
  const navigate = useNavigate(); // Initialize the navigate function
  const [user, setUser] = useState(null); // State to store user details
  const [error, setError] = useState(null); // State to store error messages

  // Fetch user details when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("userToken"); // Retrieve the token from localStorage
    if (token) {
      const fetchUserData = async () => {
        try {
          const data = await endpoints.getCurrentUser(); // Use the endpoints.getCurrentUser method
          if (data.first_name) {
            setUser(data); // Set user data if successful
          } else {
            setError("Failed to fetch user details.");
          }
        } catch (error) {
          setError("Failed to fetch user details.");
        }
      };
      fetchUserData();
    } else {
      setError("No token found. Please log in.");
    }
  }, []); // Empty dependency array to run once when the component mounts

  const handleLogout = () => {
    // Remove the token from localStorage to log out the user
    localStorage.removeItem("userToken");

    // Redirect to the home page (login page)
    navigate("/");
  };

  return (
    <div>
      <h1 className="h1 mt-30 ml-30">Settings Page</h1>
      {user ? (
        <div className="ml-30">
          <p className="fs-14 mt-30">Welcome, {user.first_name}!</p>
        </div>
      ) : (
        <p className="fs-14 mt-30 ml-30">{error}</p> // Display error if any
      )}
      <div className="ml-30 flex-row align-center">
        {/* Logout Button */}
        <p className="fs-14 bold mt-30 ml-30">Other</p>
        <button
          className="button button--tertiary ml-30 bottom"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Settings;
