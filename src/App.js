import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Groups from "./pages/Groups";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate login state
  const navigate = useNavigate(); // For programmatic navigation

  const handleLogin = () => {
    setIsLoggedIn(true); // Mock login
    navigate("/home"); // Redirect to home page after login
  };

  return (
    <div className="App">
      {/* Conditionally render Navbar */}
      {isLoggedIn && <Navbar />} {/* Only show Navbar if logged in */}
      {/* Simulate login */}
      {!isLoggedIn && <Login onLogin={handleLogin} />}{" "}
      {/* Show login if not logged in */}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
