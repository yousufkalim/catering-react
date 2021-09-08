// Init
import axios from "axios";
import { toast } from "react-toastify";

const api = async (method = "get", uri, body) => {
  // Default setting for production
  if (window.location.hostname !== "localhost") {
    axios.defaults.withCredentials = true;
  }

  axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");

  // API Call
  // const url = process.env.REACT_APP_BASE_URL + uri;
  return new Promise((resolve, reject) => {
    axios[method](uri, body)
      .then((res) => resolve(res))
      .catch((err) => {
        if (err?.response?.status === 403) {
          // window.location = "/login";
        } else {
          console.log("API Error --------> ", err.response.status);
          toast.error(err?.response?.data ? err.response.data : err?.message);
          reject(err);
        }
      });
  });
};

// Export
export default api;
