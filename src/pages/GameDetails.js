import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { endpoints } from "../helper/axiosHelper";
import Tabs from "../components/Tabs";
import AddFlights from "../components/AddFlights";
import "../utils/Home.scss";
import "../utils/buttons.scss"; // Import the buttons.scss file

function GameDetails() {
  const { id } = useParams();
  const [matchDetails, setMatchDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attending, setAttending] = useState(false); // Track attendance status
  const [lookingForTicket, setLookingForTicket] = useState(false); // Track ticket search status
  const [message, setMessage] = useState(""); // Display confirmation message

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}.${month}.${year}`;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        const response = await endpoints.getMatchDetails(id);

        // Set the match details directly
        setMatchDetails(response); // Set the entire response as matchDetails
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch match details.");
        setLoading(false);
      }
    };

    fetchMatchDetails();
  }, [id]);

  const handleAttendance = () => {
    setAttending(!attending); // Toggle attendance state
    setMessage(
      !attending
        ? "You are now attending this match! 🎉"
        : "You are no longer attending this match."
    );
    setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
  };

  const handleTicketSearch = () => {
    setLookingForTicket(!lookingForTicket); // Toggle ticket search state
    setMessage(
      !lookingForTicket
        ? "You are now looking for a ticket."
        : "You are no longer looking for a ticket."
    );
    setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
  };

  if (loading) {
    return <div className="loading">Loading match details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const tabs = [
    {
      name: "Add Flights",
      label: "Add Flights",
      content: <AddFlights />,
    },
    {
      name: "Attending",
      label: "Attending",
      content: (
        <div>
          <p>Match statistics will be displayed here.</p>
        </div>
      ),
    },
    {
      name: "Flights",
      label: "Flights",
      content: (
        <div>
          <p>Match events will be displayed here.</p>
        </div>
      ),
    },
  ];

  return (
    <div className="home">
      <p className="h1 text-center mt-30">Match Details</p>
      <div className="match-card">
        <div className="match-header">
          <div className="competition-info">
            <img
              src={matchDetails.competition.emblem}
              alt="competition emblem"
              className="competition-logo"
            />
            <h3 className="competition-name">
              {matchDetails.competition.name}
            </h3>
          </div>
          <div className="match-time">{formatDate(matchDetails.utcDate)}</div>
        </div>

        <div className="match-body">
          <p className="match-time">{formatTime(matchDetails.utcDate)}</p>
          <div className="match-time-left">
            <div className="team home-team">
              <img
                src={matchDetails.homeTeam.crest || "default-logo.png"}
                alt={matchDetails.homeTeam.name}
                className="team-logo"
              />
              <span>{matchDetails.homeTeam.name}</span>
            </div>
            <div className="team away-team">
              <img
                src={matchDetails.awayTeam.crest || "default-logo.png"}
                alt={matchDetails.awayTeam.name}
                className="team-logo"
              />
              <span>{matchDetails.awayTeam.name}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="button-container flex-row gap-10 align-center">
        <button
          className={`button ${
            attending ? "button--primary" : "button--primary"
          }`}
          onClick={handleAttendance}
        >
          {attending ? "Unattend" : "Attend"}
        </button>

        <button
          className={`button ml-10 ${
            lookingForTicket ? "button--primary" : "button--primary"
          }`}
          onClick={handleTicketSearch}
        >
          {lookingForTicket ? "Ticket Sorted" : "Need Ticket"}
        </button>
      </div>

      {/* Display confirmation message */}
      {message && <p className="attendance-confirmation">{message}</p>}

      {/* Tabs Component placed below the match card */}
      <Tabs tabs={tabs} />
    </div>
  );
}

export default GameDetails;
