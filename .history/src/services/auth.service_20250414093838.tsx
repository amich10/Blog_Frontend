import HttpService from "./http.service";

class AuthService extends HttpService{
    #headers:Record<string,string>={} //object
    #params:Record<string,string>={}
    #config:any={
        headers:this.#headers,
        params:this.#params
    }

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
            params
        }
    }

    getRequest=async(url:string,config:any={})=>{};
    postRequest=async(url:string,data:any,config:any={})=>{};
    patchRequest=async(url:string,data:any,config:any={})=>{};
    deleteRequest=async(url:string,data:any,connfig:any={})=>{};
}
const authSvc = new AuthService()
export default authSvc;