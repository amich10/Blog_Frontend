import { createContext } from "react";




interface ICategoryContext {

}


export const CategoryContext = createContext({

})

interface IChildrenProps {
    children:
}
export const CategoryContextProvider = ({children}:ReactNode) =>{
    return (
        <>
        {children}
        </>
    )
}




