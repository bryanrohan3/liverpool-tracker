import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Groups from "./pages/Groups";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Navbar from "./components/Navbar";
import GameDetails from "./pages/GameDetails";
import "./App.css";

function App() {
  const [showNavbar, setShowNavbar] = useState(true);
  const location = useLocation();

  const isLoggedIn = !!localStorage.getItem("userToken");

  useEffect(() => {
    // Show or hide the Navbar based on the route
    if (location.pathname === "/" || location.pathname === "/signup") {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [location]);

  return (
    <div className="App">
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/groups"
          element={isLoggedIn ? <Groups /> : <Navigate to="/" />}
        />
        <Route
          path="/settings"
          element={isLoggedIn ? <Settings /> : <Navigate to="/" />}
        />
        <Route
          path="/game/:id"
          element={isLoggedIn ? <GameDetails /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
