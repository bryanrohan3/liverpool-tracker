import axios from "axios";

const apiConstants = {
  api_hostname: "https://api.football-data.org/v4/",
};

const axiosInstance = axios.create({
  baseURL: apiConstants.api_hostname,
});

let tokenType = "X-Auth-Token";

const getMatches = (teamId, token) => {
  console.log("API Token:", token); // For debugging
  return axiosInstance.get(`teams/${teamId}/matches?status=SCHEDULED`, {
    headers: {
      [tokenType]: token,
    },
  });
};

const endpoints = {
  getMatches,
};

export { axiosInstance, endpoints };
