import React, { useEffect, useState } from "react";
import { endpoints } from "../helper/axiosHelper";
import "../utils/fonts.scss";
import "../utils/flex.scss";
import "../utils/margins.scss";

const token = process.env.REACT_APP_API_KEY;
console.log("PENV:", process.env); // Logs all environment variables to the console
console.log("API Token:", token); // Debug: Check if the token is now accessible

function Home() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const teamId = 64;

  useEffect(() => {
    endpoints
      .getMatches(teamId, token)
      .then((response) => {
        const fetchedMatches = response.data.matches;
        setMatches(fetchedMatches);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching matches", error);
        setLoading(false);
      });
  }, [teamId]);
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
