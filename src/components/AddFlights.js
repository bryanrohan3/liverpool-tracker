import React, { useState } from "react";
import { debounce } from "lodash";
import "../utils/AddFlights.scss";
import "../utils/margins.scss";
import ryanairImage from "../assets/ryanair.svg";
import alImage from "../assets/al.png";
import airportsData from "../config/Airports.json";

function AddFlights() {
  // const [flightType, setFlightType] = useState("Single");
  const [airline, setAirline] = useState("Ryanair");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [filteredFrom, setFilteredFrom] = useState([]);
  const [filteredTo, setFilteredTo] = useState([]);
  const [isFlightAdded, setIsFlightAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getButtonColor = (airline) => {
    if (airline === "Ryanair") {
      return "#2B4779";
    } else if (airline === "Aer Lingus") {
      return "#008374";
    }
    return "#c8102e";
  };

  const handleAddFlight = () => {
    // console.log({ flightType, airline, from, to, date, time });

    setIsLoading(true); // Start the loading state

    // Simulate the process and update the UI
    setTimeout(() => {
      setIsLoading(false);
      setIsFlightAdded(true);

      // Reset after 1.5 seconds
      setTimeout(() => {
        setIsFlightAdded(false);
      }, 1500);
    }, 1000);
  };

  const debouncedSearch = debounce((searchTerm, type) => {
    const filteredAirports = airportsData.filter((airport) =>
      airport.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (type === "from") {
      setFilteredFrom(filteredAirports);
    } else {
      setFilteredTo(filteredAirports);
    }
  }, 500);

  const handleFromChange = (e) => {
    setFrom(e.target.value);
    debouncedSearch(e.target.value, "from");
  };

  const handleToChange = (e) => {
    setTo(e.target.value);
    debouncedSearch(e.target.value, "to");
  };

  const handleSelection = (airport, type) => {
    if (type === "from") {
      setFrom(airport.name);
      setFilteredFrom([]);
    } else {
      setTo(airport.name);
      setFilteredTo([]);
    }
  };

  return (
    <div className="add-flights">
      <div className="add-flights__form">
        <div className="airline-selection">
          <div
            className={`airline-item ${
              airline === "Ryanair" ? "selected" : ""
            }`}
            onClick={() => setAirline("Ryanair")}
            style={{ "--selected-airline-color": getButtonColor("Ryanair") }}
          >
            <img src={ryanairImage} alt="Ryanair" />
          </div>
          <div
            className={`airline-item ${
              airline === "Aer Lingus" ? "selected" : ""
            }`}
            onClick={() => setAirline("Aer Lingus")}
            style={{ "--selected-airline-color": getButtonColor("Aer Lingus") }}
          >
            <img src={alImage} alt="Aer Lingus" />
          </div>
        </div>

        <div className="from-to">
          <label>
            From
            <input
              type="text"
              value={from}
              onChange={handleFromChange}
              placeholder="From"
              className="input mt-10 mb-10"
            />
            {from && filteredFrom.length > 0 && (
              <ul className="suggestions">
                {filteredFrom.map((airport) => (
                  <li
                    key={airport.code}
                    onClick={() => handleSelection(airport, "from")}
                  >
                    {airport.name}
                  </li>
                ))}
              </ul>
            )}
          </label>

          <label>
            To
            <input
              type="text"
              value={to}
              onChange={handleToChange}
              placeholder="To"
              className="input mt-10 mb-10"
            />
            {to && filteredTo.length > 0 && (
              <ul className="suggestions">
                {filteredTo.map((airport) => (
                  <li
                    key={airport.code}
                    onClick={() => handleSelection(airport, "to")}
                  >
                    {airport.name}
                  </li>
                ))}
              </ul>
            )}
          </label>

          <label>
            Time
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="input mt-10"
            />
          </label>
        </div>

        <div className="date">
          <label>
            Date
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input mt-10"
            />
          </label>
        </div>
      </div>

      <div className="add-flights__button-container">
        <button
          className={`button button--primary ${isLoading ? "loading" : ""}`}
          onClick={handleAddFlight}
          style={{
            marginBottom: "150px",
            backgroundColor: isFlightAdded
              ? "#4CAF50"
              : getButtonColor(airline),
          }}
        >
          {isLoading ? (
            <span className="spinner"></span>
          ) : isFlightAdded ? (
            "Flight Added"
          ) : (
            "Add Flights"
          )}
        </button>
      </div>
    </div>
  );
}

export default AddFlights;
