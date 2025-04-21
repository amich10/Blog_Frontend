import HttpService from "./http.service";

class AuthService extends HttpService{
    getRequest=async(url:string)=>{};
    postRequest=async()=>{};
    patchRequest=async()=>{};
    deleteRequest=async()=>{};
}
const authSvc = new AuthService()
export default authSvc;