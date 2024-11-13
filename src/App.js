import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Groups from "./pages/Groups";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [showNavbar, setShowNavbar] = useState(true);
  const location = useLocation(); // Get the current route/location

  useEffect(() => {
    // Check if we're on the login page and set showNavbar accordingly
    if (location.pathname === "/") {
      setShowNavbar(false); // Hide navbar on the login page
    } else {
      setShowNavbar(true); // Show navbar on other pages
    }
  }, [location]); // Dependency on location to trigger effect on route changes

  return (
    <div className="App">
      {/* Conditionally render Navbar based on the state */}
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
