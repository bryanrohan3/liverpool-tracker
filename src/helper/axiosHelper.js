import axios from "axios";

// Get the API hostname from the constants
const apiConstants = {
  api_hostname: "https://api.football-data.org/v4/",
};

// Create an axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: apiConstants.api_hostname, // Football API base URL
});

// Use the API token header type
let tokenType = "X-Auth-Token"; // Football API uses this token header type

// Function to get matches for a specific team
const getMatches = (teamId, token) => {
  return axiosInstance.get(`teams/${teamId}/matches?status=SCHEDULED`, {
    headers: {
      [tokenType]: token, // Set the X-Auth-Token in the request headers
    },
  });
};

// Define endpoints object for easy access
const endpoints = {
  getMatches,
};

export { axiosInstance, endpoints };
