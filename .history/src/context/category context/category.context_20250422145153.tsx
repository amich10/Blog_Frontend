import { createContext, ReactNode, useState } from "react";
import { IResult } from "../../pages/category/admin.category";
import { IResponseType } from "../../services/http.service";
import categorySVc from "../../services/category.service";
import Search from "antd/es/transfer/search";
import { TablePaginationConfig } from "antd";




interface ICategoryContext {
    
}


export const CategoryContext = createContext({

})


interface IChildrenProps {
    children:ReactNode
}
export const CategoryContextProvider = ({children}:IChildrenProps) =>{
    
     const [pagination, setPagination] = useState<TablePaginationConfig>({
            total: 0,
            pageSize: 8,
            current: 1,
        });
        


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




