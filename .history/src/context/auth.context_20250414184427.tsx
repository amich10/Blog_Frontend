import { createContext, useContext } from "react";



export interface ICredentials{
    email:string,
    password:string
}
export const AuthContext = createContext({
    login:(credentials:ICredentials):Promise<void>=> {}
})



//custom Hook
export const useAuth = () =>{
   const {login} = useContext(AuthContext)
   return {
    log
   }
}



