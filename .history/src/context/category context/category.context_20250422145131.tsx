import { createContext, ReactNode, useState } from "react";
import { IResult } from "../../pages/category/admin.category";
import { IResponseType } from "../../services/http.service";
import categorySVc from "../../services/category.service";
import Search from "antd/es/transfer/search";




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
            const respose:IResponseType = await categorySVc.getRequest('/category/all',{
                params:{
                    page:page,
                    limit:limit,
                    search:Search
                }
            })
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




