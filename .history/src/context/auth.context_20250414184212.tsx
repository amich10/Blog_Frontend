import { createContext } from "react";



export interface ICredentials
export const AuthContext = createContext({
    login:(email:string,password:string):Promise<void>=> {};
})




