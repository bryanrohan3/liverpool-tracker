import axios from "axios";

// Base URLs for different APIs
const apiConstants = {
  api: "http://127.0.0.1:8000/api/", // Base API URL for all user-related requests
  footballApi: "https://api.football-data.org/v4/", // Football API base URL
};

// Create an Axios instance using the common base URL
const userAxios = axios.create({
  baseURL: apiConstants.api, // Default base URL for user-related APIs
});

// Axios request interceptor for adding the token (Authorization header)
userAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken"); // Get token from localStorage
    if (token) {
      config.headers["Authorization"] = `Token ${token}`; // Attach the token to headers
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// User-related functions
const login = async (username, password) => {
  try {
    const response = await userAxios.post("users/login/", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { error: "Network error" };
  }
};

const signup = async (data) => {
  try {
    const response = await userAxios.post("users/signup/", data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { error: "Network error" };
  }
};

const getCurrentUser = async () => {
  try {
    const response = await userAxios.get("users/current/");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { error: "Network error" };
  }
};

// Football-related functions
const getMatches = async (teamId, token) => {
  try {
    const response = await axios.get(
      `${apiConstants.footballApi}teams/${teamId}/matches?status=SCHEDULED`,
      {
        headers: { "X-Auth-Token": token },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { error: "Network error" };
  }
};

const getMatchDetails = async (matchId) => {
  try {
    const response = await axios.get(
      `${apiConstants.footballApi}matches/${matchId}`
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { error: "Network error" };
  }
};

// Define the endpoints object
const endpoints = {
  login,
  signup,
  getCurrentUser,
  getMatches,
  getMatchDetails,
};

export { userAxios, endpoints };
