import axios from "axios";
const axiosInstance = axios.create({
  //base ul of amazon backend on localhost
  // baseURL: "http://127.0.0.1:5001/clone-e31f4/us-central1/api",
  baseURL : "https://amazon-api-deploy-5x1n.onrender.com",
  // base ul of amazon backend on render.com
  //   baseURL: "https://amazon-api-deploy-1-qtc6.onrender.com",
});

export { axiosInstance };
