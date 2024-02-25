import axios from "axios";
import Constants from "./constants";

const api = axios.create({
    baseURL: Constants.BASE_URL
});

export default api;
