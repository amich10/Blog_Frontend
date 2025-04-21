import { createContext, ReactNode, useContext } from "react";
import authSvc from "../services/auth.service";
import notifcation, { NotificationType, setLocalStorage } from "../utilities/helpers";
import { webStorageConstants } from "../constants/constants";



export interface ICredentials{
    username:string,
    password:string
}
export const AuthContext = createContext({
    login:async(_credentials:ICredentials):Promise<void>=> {}
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

    const forgetPasswordFunc=(data:{email:string})

    return (
        <>
        <AuthContext.Provider value={{
            login:LoginFunc
        }}>
            {children}
        </AuthContext.Provider>
        </>
    )
} 

//custom Hook
export const useAuth = () =>{
   const {login} = useContext(AuthContext)
   return {
    login
   }
}


/* to use this value in Components;
const {login} = useAuth() */


