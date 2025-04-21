import HttpService from "./http.service";

class AuthService extends HttpService{
    #headers:any={}
    #params:any={}
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
            this.#config["Content-Type"]="multipart/form-data"
        }

        if(config.auth){
            let token=""
        }
    }

    getRequest=async(url:string,config:any={})=>{};
    postRequest=async(url:string,data:any,config:any={})=>{};
    patchRequest=async(url:string,data:any,config:any={})=>{};
    deleteRequest=async(url:string,data:any,connfig:any={})=>{};
}
const authSvc = new AuthService()
export default authSvc;