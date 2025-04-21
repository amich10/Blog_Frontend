import { Spin } from "antd";
import { createContext, useContext, useState } from "react";




export interface ILoginCredentials{
    username:string,
    password:string
}
export const AuthContext = createContext({
    login:async(credentials:ILoginCredentials):Promise<void> =>{}
})


export const AuthProvider = () =>{

    const [loading,setLoading] = useState<boolen>(true)

    return(
        <>
        <AuthContext.Provider value={{
            login
        }}>
        {loading ? <Spin f></Spin>}
        </AuthContext.Provider>
        </>
    )
}

export const useAuth = () =>{
    return useContext(AuthContext)
}