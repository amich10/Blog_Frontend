import { createContext } from "react";




interface ICategoryContext {

}


export const CategoryContext = createContext({

})

interface IChildrenProps
export const CategoryContextProvider = ({children}:ReactNode) =>{
    return (
        <>
        {children}
        </>
    )
}




