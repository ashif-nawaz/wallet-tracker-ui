import axios from "axios";
import store from "../store";
const baseURL = "http://localhost:8080/api/v1";

const client = axios.create({
  baseURL: baseURL,
});

client.interceptors.request.use((req) => {
  const auth = store.getState().auth;
  if (auth.isAuth) {
    req.headers.Authorization = `Bearer ${auth.loggedInUser.token}`;
  }
  return req;
});

client.interceptors.response.use(null, (err) => {
  const error = {
    message: err.response
      ? err.response.data.message
      : err.request
      ? err.message
      : "Something went wrong.",
    code: err.response ? err.response.status : null,
  };
  return Promise.reject(error);
});

export default client;
