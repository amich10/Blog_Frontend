import { createContext } from "react";




interface ICategoryContext {

}


export const CategoryContext = createContext({

})

interface IChildrenProps {
    children:Rea
}
export const CategoryContextProvider = ({children}:ReactNode) =>{
    return (
        <>
        {children}
        </>
    )
}




