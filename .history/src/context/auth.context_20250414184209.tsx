import { createContext } from "react";



export interface I
export const AuthContext = createContext({
    login:(email:string,password:string):Promise<void>=> {};
})




