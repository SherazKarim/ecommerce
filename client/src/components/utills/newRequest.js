import axios from "axios";

export const newRequest = axios.create({
    // baseURL: "https://ecommerce-production-8fac.up.railway.app/api/",
    baseURL: "http://localhost:8000/api/",
    withCredentials:true
})