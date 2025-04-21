import HttpService from "./http.service";

class AuthService extends HttpService{
    #headers:any={}
    #params:any={}
    #config:any={
        headers:this.#headers,
        params:this.#params
    }

    #setConfig()

    getRequest=async(url:string,config:any={})=>{};
    postRequest=async(url:string,data:any,config:any={})=>{};
    patchRequest=async(url:string,data:any,config:any={})=>{};
    deleteRequest=async(url:string,data:any,connfig:any={})=>{};
}
const authSvc = new AuthService()
export default authSvc;