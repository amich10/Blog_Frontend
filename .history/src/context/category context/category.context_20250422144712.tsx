import { createContext, ReactNode } from "react";




interface ICategoryContext {

}


export const CategoryContext = createContext({

})

interface IChildrenProps {
    children:ReactNode
}
export const CategoryContextProvider = ({children}:IChildrenProps) =>{
    return (
        <>
        {children}
        </>
    )
}




