import HttpService from "./http.service";

class AuthService extends HttpService{
    getRequest=async(url:string,config:any={})=>{};
    postRequest=async(url:string,data:any,config:any=)=>{};
    patchRequest=async()=>{};
    deleteRequest=async()=>{};
}
const authSvc = new AuthService()
export default authSvc;