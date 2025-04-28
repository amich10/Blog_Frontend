import { createContext, ReactNode, useState } from "react";
import { IResult } from "../../pages/category/admin.category";
import { IResponseType } from "../../services/http.service";




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
            const respose:IResponseType = await cate
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




