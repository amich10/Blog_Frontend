import { Children, createContext, ReactNode } from "react";




interface ICategoryContext {

}


export const CategoryContext = createContext({

})


export const CategoryContextProvider = ({children}:ReactNode) =>{
    return (
        <>
        {children}
        </>
    )
}




