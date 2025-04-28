import { Children, createContext } from "react";




interface ICategoryContext {

}


export const CategoryContext = createContext({

})


export const CategoryContextProvider = ({children}:React.ReactNode) =>{
    return (
        <>
        {children}
        </>
    )
}




