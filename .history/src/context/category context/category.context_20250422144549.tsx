import { Children, createContext } from "react";




interface ICategoryContext {

}


export const CategoryContext = createContext({

})


export const CategoryContextProvider = ({Children}:React.ReactNode) =>{
    return (
        <>
        {children}
        </>
    )
}




