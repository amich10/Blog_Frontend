import HttpService from "./http.service";

class AuthService extends HttpService{
    getRequest=async()=>{};
    postRequest=()=>{};
    patchRequest=()=>{};
    deleteRequest=()=>{};
}
const authSvc = new AuthService()
export default authSvc;