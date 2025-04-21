import { Children, createContext, useContext } from "react";



export interface ICredentials{
    email:string,
    password:string
}
export const AuthContext = createContext({
    login:async(credentials:ICredentials):Promise<void>=> {}
})

//main

export const AuthProvider = (Children:any) =>{
    return (
        <>
        <AuthContext.Provider>
            {Children}
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



