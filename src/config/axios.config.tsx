/// <reference types="vite/client" />
import axios from "axios"
import { getLocalStorage } from "../utilities/helpers";
import { webStorageConstants } from "../constants/constants";

const BASE_URL = import.meta.env.VITE_API_URL as string;
const axiosInstance = axios.create({
    baseURL:BASE_URL,
    timeout: 30000, //in millisec = 30 sec
    timeoutErrorMessage:"Request time out",
    responseEncoding:"utf-8",
    responseType:"json",
})


axiosInstance.interceptors.request.use((config) =>{
    let token = getLocalStorage(webStorageConstants.ACCESS)
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})


export default axiosInstance;