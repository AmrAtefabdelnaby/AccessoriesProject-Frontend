import axios from "axios";

const axiosCongif = axios.create({
  baseURL: "http://localhost:1337",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const token = sessionStorage.getItem("token");
if (token) {
  axiosCongif.defaults.headers["Authorization"] = `Bearer ${token}`;
} 

export default axiosCongif;
