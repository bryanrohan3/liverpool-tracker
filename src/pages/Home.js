import React, { useEffect, useState } from "react";
import axios from "axios";
import "../utils/Home.scss";
import "../utils/fonts.scss";
import { useNavigate } from "react-router-dom";

function Home() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigat

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/matches/") // Assuming your Django server runs on port 8000
      .then((response) => {
        setMatches(response.data.matches);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching matches", error);
        setLoading(false);
      });
  }, []);

  // Format date into DD.MM.YY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}.${month}.${year}`;
  };

  // Format time into HH:mm
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // Function to handle match card click and log match id
  const handleMatchClick = (matchId) => {
    navigate(`/game/${matchId}`); // Navigate to the GameDetails page
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home">
      <p className="h1 text-center mt-30">Upcoming Matches</p>
      <div className="match-list">
        {matches.length === 0 ? (
          <p className="text-center mt-30 fs-12">No upcoming matches found.</p>
        ) : (
          matches.map((match) => (
            <div
              className="match-card"
              key={match.id}
              onClick={() => handleMatchClick(match.id)} // Add onClick handler
            >
              <div className="match-header">
                <div className="competition-info">
                  <img
                    src={match.competition.emblem}
                    alt="competition emblem"
                    className="competition-logo"
                  />
                  <h3 className="competition-name">{match.competition.name}</h3>
                </div>
                <div className="match-time">{formatDate(match.utcDate)}</div>
              </div>

              <div className="match-body">
                <p className="match-time">{formatTime(match.utcDate)}</p>
                <div className="match-time-left">
                  <div className="team home-team">
                    <img
                      src={match.homeTeam.crest}
                      alt={match.homeTeam.name}
                      className="team-logo"
                    />
                    <span>{match.homeTeam.name}</span>
                  </div>
                  <div className="team away-team">
                    <img
                      src={match.awayTeam.crest}
                      alt={match.awayTeam.name}
                      className="team-logo"
                    />
                    <span>{match.awayTeam.name}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
