import axios from "axios";

export default axios.create({
  baseURL: "https://flower-ly.co.kr",

  withCredentials: false,
  headers: {
    "Content-type": "application/json",
  },
});

export const KDMaxios = axios.create({
  baseURL: "https://flower-ly.co.kr",
});
