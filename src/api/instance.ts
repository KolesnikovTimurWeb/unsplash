import axios from "axios";
const AUTH_TOKEN = "R19vy8Na6C-GYTL9U0KTX-sPiNTUq5yqEY5nsSa6zq4";

export const instance = axios.create({
  baseURL: `https://api.unsplash.com/`,

  headers: {
    Authorization: `Client-ID ${AUTH_TOKEN}`,
  },
});
