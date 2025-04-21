import { createContext, ReactNode, useContext } from "react";
import authSvc from "../services/auth.service";
import notifcation, { NotificationType, setLocalStorage } from "../utilities/helpers";
import { webStorageConstants } from "../constants/constants";



export interface ICredentials{
    username:string,
    password:string
}
export const AuthContext = createContext({
    login:async(_credentials:ICredentials):Promise<void>=> {},
    forgetPassword:async(data:{email:string}):Promise<void> =>{}
})

//main

export interface IChildrenProps{
    children:ReactNode
}
export const AuthProvider = ({ children }: IChildrenProps) =>{

    const LoginFunc = async(credentials:ICredentials) =>{
        try {
            // console.log(credentials)
            const response = await authSvc.postRequest('/auth/login',credentials)
            console.log("Response :",response)
            notifcation(response.result.message,NotificationType.SUCCESS)

            //set localStorage (access token)
            setLocalStorage(webStorageConstants.ACCESS,response.result.data.accessToken)
            setLocalStorage(webStorageConstants.REFRESH,response.result.data.refreshToken)
        } catch (exception:any) {
            //console.log("Exception :",exception)
            notifcation(exception.response.message,NotificationType.ERROR)
        }
    }

    const forgetPasswordFunc=async(data:{email:string}) =>{
        try {
            const response = await authSvc.postRequest('auth/forget-password',data)
            console.log("Response",response)
            notifcation(response.result.message,NotificationType.SUCCESS)
        } catch (exception:any) {
            console.log("Exception",exception)

            const errorMsg = exception.response.messaeg || "Unexpected error occured. Please, try again after some time."
            notifcation(exception.response.message,NotificationType.ERROR)
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


