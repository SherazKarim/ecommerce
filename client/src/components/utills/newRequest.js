import axios from "axios";

export const newRequest = axios.create({
    baseURL: "http://ecommerce-app-peach-zeta.vercel.app/api/",
    withCredentials:true
})