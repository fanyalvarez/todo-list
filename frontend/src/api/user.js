import axios from "axios";

const API_URL = "http://localhost:8000";

export const registerRequest = async (user) =>
  axios.post(API_URL + "/create/user", user);

export const loginRequest = async (user) =>
  axios.post(API_URL + "/token", user);

