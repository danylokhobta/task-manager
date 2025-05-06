// apiPlain.ts
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const plainApi = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default plainApi;
