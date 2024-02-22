import axios from "axios";

export const newRequest = axios.create({
    baseURL: "http://localhost:8000/api/",
    withCredentials:true
})