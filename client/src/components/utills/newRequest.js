import axios from "axios";

export const newRequest = axios.create({
    baseURL: "https://ecom-app-backend.vercel.app/api/",
    withCredentials:true
})