import axios from "axios";

export const newRequest = axios.create({
    baseURL: "https://ecom-app-api-silk.vercel.app/api/",
    withCredentials:true
})