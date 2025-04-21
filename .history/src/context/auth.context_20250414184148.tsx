import { createContext } from "react";


export const    AuthContext = createContext({
    login:(email:string,password:string):Promise<void>=> {};
})

