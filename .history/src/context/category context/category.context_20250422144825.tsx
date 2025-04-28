import { createContext, ReactNode, useState } from "react";




interface ICategoryContext {
    
}


export const CategoryContext = createContext({

})


interface IChildrenProps {
    children:ReactNode
}
export const CategoryContextProvider = ({children}:IChildrenProps) =>{

    const allCategories = () =>{
        try {
            
        } catch (exception) {
            
        }
    }

    const [categoryData,setCategoryData] = useState()
    return (
        <>
        {children}
        </>
    )
}




