import axios from "axios";
const baseURL = "http://localhost:3000";

export const exiosPublic = axios.create({
  baseURL,
});

export const exiosPrivate = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
//signin and signup routes use axiosPublic
//all other routes use axiosPrivate
