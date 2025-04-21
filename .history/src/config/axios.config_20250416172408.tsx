import axios from "axios"


const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    timeout: 30000, //in millisec = 30 sec
    timeoutErrorMessage:"Request time out",
    responseEncoding:"utf-8",
    responseType:"json",
})


in


export default axiosInstance;