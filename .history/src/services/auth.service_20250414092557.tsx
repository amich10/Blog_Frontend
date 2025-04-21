import HttpService from "./http.service";

class AuthService extends HttpService{
    getRequest=async()=>{};
    postRequest=async()=>{};
    patchRequest=async()=>{};
    deleteRequest=()=>{};
}
const authSvc = new AuthService()
export default authSvc;