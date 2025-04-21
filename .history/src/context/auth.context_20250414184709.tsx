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

    const LoginFunc = async (credentials: ICredentials): Promise<void> => {
        try {
            // Add your login logic here, e.g., API call
            console.log("Logging in with credentials:", credentials);
        } catch (exception) {
            console.log(exception);
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



