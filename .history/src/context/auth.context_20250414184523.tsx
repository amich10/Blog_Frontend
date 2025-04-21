import { createContext, useContext } from "react";



export interface ICredentials{
    email:string,
    password:string
}
export const AuthContext = createContext({
    login:async(credentials:ICredentials):Promise<void>=> {}
})

//main

export const AuthProvider = () =>{
    return (
        <>
        <AuthProvider.p
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



