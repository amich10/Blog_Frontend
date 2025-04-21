import axiosInstance from "../config/axios.config";
import HttpService from "./http.service";

class AuthService extends HttpService{
    #headers:Record<string,string>={} //object
    #params:Record<string,string>={}
    #config:any={}

    #setConfig(config:any){
        this.#headers = {
            ...this.#headers,
            "Content-Type":"application/json"
        }
        if(config.file || config.files){
            this.#headers["Content-Type"]="multipart/form-data"
        }

        if(config.auth){
            const token = "" //to be accessed from LocalStorage
            this.#headers["authorization"] = `Bearer ${token}`

        }
        if(config.params){
            this.#params=config.params;
        }

        this.#config = {
            headers:this.#headers,
            params:this.#params
        }
    }

    getRequest=async(url:string,config:any={})=>{
        try {
            this.#setConfig(config);
            let {data:responseData,status} = await axiosInstance.get(url,this.#config)
            return {
                result:responseData,
                status:status
            }
        } catch (exception:any) {
            throw {
                response:exception?.response?.data,
                status:exception?.response?.status
            }
        }
    };
    postRequest=async(url:string,data:any,config:any={})=>{
        try {
            this.#setConfig(config);
            let {data:responseData,status} = await axiosInstance.post(url,data,this.#config)
            return {
                result:responseData,
                status:status
            }
        } catch (exception:any) {
            throw {
                response:exception?.response?.data,
                status:exception?.response?.status
            }
        }
    };
    patchRequest=async(url:string,data:any,config:any={})=>{
        try {
            this.#setConfig(config);
            let {data:responseData,status} = await axiosInstance.patch(url,data,this.#config)
            return {
                result:responseData,
                status:status
            }
        } catch (exception:any) {
            throw {
                response:exception?.response?.data,
                status:exception?.response?.status
            }
        }
    };
    deleteRequest=async(url:string,connfig:any={})=>{
        try {
            this.#setConfig(config);
            let {data:responseData,status} = await axiosInstance.post(url,this.#config)
            return {
                result:responseData,
                status:status
            }
        } catch (exception:any) {
            throw {
                response:exception?.response?.data,
                status:exception?.response?.status
            }
        }
    };
}
const authSvc = new AuthService()
export default authSvc;