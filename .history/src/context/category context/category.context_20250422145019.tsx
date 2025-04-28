import { createContext, ReactNode, useState } from "react";
import { IResult } from "../../pages/category/admin.category";




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
            const respose:IRE
        } catch (exception) {
            
        }
    }

    const [categoryData,setCategoryData] = useState<Array<IResult>>()
    return (
        <>
        {children}
        </>
    )
}




