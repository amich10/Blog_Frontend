import { createContext } from "react";




export interface ILoginCredentials{
    username:string,
    password:string
}
export const AuthContext = createContext({
    login:async(credentials:ILoginCredentials)
})