import axios from "axios";

export const newRequest = axios.create({
    baseURL: "https://ecommerce-production-8fac.up.railway.app/api/",
    withCredentials:true
})