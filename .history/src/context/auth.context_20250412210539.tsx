import { createContext, useContext } from "react";




export interface ILoginCredentials{
    username:string,
    password:string
}
export const AuthContext = createContext({
    login:async(credentials:ILoginCredentials):Promise<void> =>{}
})


export const AuthProvider = () =>{

    const [loading,setLoading] = useState<boolean>

    return(
        <>
        <AuthContext.Provider value={{
            login
        }}>

        </AuthContext.Provider>
        </>
    )
}

export const useAuth = () =>{
    return useContext(AuthContext)
}