import { createContext, ReactNode, useContext, useState } from "react";
import authSvc from "../services/auth.service";
import notifcation, { NotificationType, setLocalStorage } from "../utilities/helpers";
import { webStorageConstants } from "../constants/constants";



export interface ICredentials{
    username:string,
    password:string
}
export interface IChildrenProps{
    children:ReactNode
}


export interface IUserDetails {
    name:string,
    username:string,
    email:string,
    phone:string,
    address:string,
    role:string,
    status:string,
    _id:string,
    image:{
        url:string,
        optimizedUrl:string
    },
    createdAt:Date
    bio:string
}
export const AuthContext = createContext({
    login:async(_credentials:ICredentials):Promise<void>=> {},
    forgetPassword:async(_data:{email:string}):Promise<void> =>{}
    userDetails:
})


export const AuthProvider = ({ children }: IChildrenProps) =>{

    const [userDetails,setUserDetails] = useState<IUserDetails>()

    const LoginFunc = async(credentials:ICredentials) =>{
        try {
            // console.log(credentials)
            const response = await authSvc.postRequest('/auth/login',credentials)
            console.log("Response :",response)
            notifcation(response.result.message,NotificationType.SUCCESS)


            //set localStorage (access token)
            setLocalStorage(webStorageConstants.ACCESS,response.result.data.accessToken)
            setLocalStorage(webStorageConstants.REFRESH,response.result.data.refreshToken)


            const userInfo = await authSvc.getRequest('auth/me',credentials)
            console.log('Logged in user data :',userInfo)
            setUserDetails(userInfo.result.data)
            

        } catch (exception:any) {
            //console.log("Exception :",exception)
            notifcation(exception.response.message,NotificationType.ERROR)
        }
    }

    const forgetPasswordFunc=async(data:{email:string}) =>{
        try {
            const response = await authSvc.postRequest('auth/forget-password',data)
            //console.log("Response",response)
            notifcation(response.result.message,NotificationType.SUCCESS)
        } catch (exception:any) {
            //console.log("Exception",exception)
            const errorMsg = exception.response.message || "Unexpected error occured. Please, try again after some time."
            notifcation(errorMsg,NotificationType.ERROR)
        }
    }

    return (
        <>
        <AuthContext.Provider value={{
            login:LoginFunc,
            forgetPassword:forgetPasswordFunc
        }}>
            {children}
        </AuthContext.Provider>
        </>
    )
} 

//custom Hook
export const useAuth = () =>{
   const {login,forgetPassword} = useContext(AuthContext)
   return {
    login,
    forgetPassword
   }
}


/* to use this value in Components;
const {login} = useAuth() */


