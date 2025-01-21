// axiosHelper.js
import axios from "axios";

const apiConstants = {
  footballApi: "https://api.football-data.org/v4/",
  userApi: "http://127.0.0.1:8000/api/users/",
};

const footballAxios = axios.create({
  baseURL: apiConstants.footballApi,
});

const userAxios = axios.create({
  baseURL: apiConstants.userApi,
});

let tokenType = "X-Auth-Token";

// Add signup to the endpoints
const signup = async (data) => {
  try {
    const response = await userAxios.post("", data); // Assuming this is the signup endpoint
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { error: "Network error" };
  }
};

const getMatches = (teamId, token) => {
  return footballAxios.get(`teams/${teamId}/matches?status=SCHEDULED`, {
    headers: {
      [tokenType]: token,
    },
  });
};

const getMatchDetails = async (matchId) => {
  return await axios.get(`http://127.0.0.1:8000/api/proxy/matches/${matchId}`);
};

// Login function
const login = async (username, password) => {
  try {
    const response = await userAxios.post("login/", { username, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { error: "Network error" };
  }
};

// Define endpoints
const endpoints = {
  signup, // Add the signup function here
  login,
  getMatches,
  getMatchDetails,
};

export { footballAxios, userAxios, endpoints };
