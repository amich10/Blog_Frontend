import { createContext, ReactNode, useState } from "react";




interface ICategoryContext {
    
}


export const CategoryContext = createContext({

})


interface IChildrenProps {
    children:ReactNode
}
export const CategoryContextProvider = ({children}:IChildrenProps) =>{

    const allCategories = async() =>{
        try {
            
        } catch (exception) {
            
        }
    }

    const [categoryData,setCategoryData] = useState<Array<>>()
    return (
        <>
        {children}
        </>
    )
}




