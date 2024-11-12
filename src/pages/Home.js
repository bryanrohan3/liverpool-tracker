import React, { useEffect, useState } from "react";
import { endpoints } from "../helper/axiosHelper"; // Assuming axiosHelper.js is in the helper folder
import "../utils/fonts.scss";
import "../utils/flex.scss";
import "../utils/margins.scss";

// Assuming you're storing the API token in the .env file
const token = process.env.REACT_APP_API_KEY; // Get the token from the .env file

function Home() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const teamId = 64; // Example team ID (Liverpool)

  useEffect(() => {
    // Fetch matches for the specified team ID
    endpoints
      .getMatches(teamId, token) // Pass the teamId and token directly
      .then((response) => {
        const fetchedMatches = response.data.matches; // Get the matches from the response
        setMatches(fetchedMatches);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching matches", error);
        setLoading(false);
      });
  }, [teamId]); // Only use 'teamId' as a dependency (no need for 'token')

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p className="h1 text-center mt-30">Upcoming Matches</p>
      <div>
        {matches.length === 0 ? (
          <p className="text-center mt-30 fs-12">No upcoming matches found.</p>
        ) : (
          <ul>
            {matches.map((match) => (
              <li key={match.id}>
                <div>
                  <h3>{match.competition.name}</h3>
                  <img
                    src={match.competition.emblem}
                    alt="competition emblem"
                  />
                  <p>
                    {match.homeTeam.name} vs {match.awayTeam.name}
                  </p>
                  <p>Date: {new Date(match.utcDate).toLocaleString()}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Home;
