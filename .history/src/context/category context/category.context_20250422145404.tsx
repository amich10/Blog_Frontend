import { createContext, ReactNode, useState } from "react";
import { IQueryProps, IResult } from "../../pages/category/admin.category";
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

    const [categoryData,setCategoryData] = useState<Array<IResult>>()
     const [pagination, setPagination] = useState<TablePaginationConfig>({
            total: 0,
            pageSize: 8,
            current: 1,
        });
        const [search, setSearch] = useState<string>("");


    const allCategories = async({page=pagination.current,limit=pagination.pageSize,search=""}:IQueryProps) =>{
        try {
            const respose:IResponseType = await categorySVc.getRequest('/category/all',{
                params:{
                    page:page,
                    limit:limit,
                    search:Search
                }
            })
            setCategoryData(respose.result.data.title)
        } catch (exception) {
            
        }
    }

    return (
        <>
        {children}
        </>
    )
}




