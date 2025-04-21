import axios from "axios"
import { getLocalStorage } from "../utilities/helpers";
import { webStorageConstants } from "../constants/constants";


const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    timeout: 30000, //in millisec = 30 sec
    timeoutErrorMessage:"Request time out",
    responseEncoding:"utf-8",
    responseType:"json",
})


axiosInstance.interceptors.request.use((config) =>{
    let token = getLocalStorage(webStorageConstants.ACCESS)
    if()
})


export default axiosInstance;