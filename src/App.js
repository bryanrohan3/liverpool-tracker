import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes, Route from react-router-dom
import Home from "./pages/Home";
import Groups from "./pages/Groups";
import Settings from "./pages/Settings";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Navbar is always visible */}
        <Routes>
          {" "}
          {/* Use Routes to wrap your Route components */}
          <Route path="/home" element={<Home />} /> {/* Use element prop */}
          <Route path="/groups" element={<Groups />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
