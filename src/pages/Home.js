import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

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
