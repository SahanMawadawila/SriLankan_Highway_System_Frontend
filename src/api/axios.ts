import axios from "axios";
const baseURL = "http://localhost:3000";

export const axiosPublic = axios.create({
  baseURL,
});

export const axiosPrivate = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
//signin and signup routes use axiosPublic
//all other routes use axiosPrivate
