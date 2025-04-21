import HttpService from "./http.service";

class AuthService extends HttpService{
    getRequest=()=>{};
    postRequest=()=>{};
    patchRequest=()=>{};
    deleteRequest=()=>{};
}
const authSvc = new AuthService()
export default authSvc;