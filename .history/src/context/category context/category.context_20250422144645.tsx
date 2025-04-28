import { createContext } from "react";




interface ICategoryContext {

}


export const CategoryContext = createContext({

})

int
export const CategoryContextProvider = ({children}:ReactNode) =>{
    return (
        <>
        {children}
        </>
    )
}




