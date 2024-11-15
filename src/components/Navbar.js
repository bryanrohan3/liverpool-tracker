import React, { useState } from "react";
import { FaHome, FaUsers, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../utils/Navbar.scss";

function Navbar() {
  const [activeLink, setActiveLink] = useState("home");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__item">
          <Link
            to="/home" // Use 'to' instead of 'href' for React Router
            className={`navbar__link ${activeLink === "home" ? "active" : ""}`}
            onClick={() => handleLinkClick("home")}
          >
            <FaHome className="navbar__icon" />
            <span className="navbar__text">Home</span>
          </Link>
        </li>
        <li className="navbar__item">
          <Link
            to="/groups" // Use 'to' instead of 'href'
            className={`navbar__link ${
              activeLink === "groups" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("groups")}
          >
            <FaUsers className="navbar__icon" />
            <span className="navbar__text">Friends</span>
          </Link>
        </li>
        <li className="navbar__item">
          <Link
            to="/settings" // Use 'to' instead of 'href'
            className={`navbar__link ${
              activeLink === "settings" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("settings")}
          >
            <FaCog className="navbar__icon" />
            <span className="navbar__text">Settings</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
