import { createContext, ReactNode, useState } from "react";
import { IResult } from "../../pages/category/admin.category";
import { IResponseType } from "../../services/http.service";
import categorySVc from "../../services/category.service";




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
            const respose:IResponseType = await categorySVc.getRequest('/category')
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




