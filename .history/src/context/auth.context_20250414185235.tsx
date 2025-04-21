import { Children, createContext, useContext } from "react";



export interface ICredentials{
    username:string,
    password:string
}
export const AuthContext = createContext({
    login:async(credentials:ICredentials):Promise<void>=> {}
})

//main
export const AuthProvider = (Children:any) =>{

    const LoginFunc = async() =>{
        try {
            
        } catch (exception) {
            console.log(exception)
        }
    }

    return (
        <>
        <AuthContext.Provider value={{
            login:LoginFunc
        }}>
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


/* to use this value in Components;
const {login} = useAuth() */


