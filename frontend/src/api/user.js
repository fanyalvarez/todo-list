import axios from "axios";

export const registerRequest = async (user) => axios.post('https://todonotes.onrender.com/create/user', user)
export const loginRequest = async (user) => axios.post('https://todonotes.onrender.com/token', user)