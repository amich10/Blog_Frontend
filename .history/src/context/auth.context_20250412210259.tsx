import { createContext, useContext } from "react";




export interface ILoginCredentials{
    username:string,
    password:string
}
export const AuthContext = createContext({
    login:async(credentials:ILoginCredentials):Promise<void> =>{}
})





export const useAuth = () =>{
    return useContext(AuthContext)
}