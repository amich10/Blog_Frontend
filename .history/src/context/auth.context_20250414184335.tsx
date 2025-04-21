import { createContext } from "react";



export interface ICredentials{
    email:string,
    password:string
}
export const AuthContext = createContext({
    login:(credentials:ICredentials):Promise<void>=> {}
})



//custom Hook
export



