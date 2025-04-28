import { createContext, ReactNode, useEffect, useState } from "react";
import { IQueryProps, IResult } from "../../pages/category/admin.category";
import { IResponseType } from "../../services/http.service";
import categorySVc from "../../services/category.service";
import Search from "antd/es/transfer/search";
import { TablePaginationConfig } from "antd";




interface ICategoryContext {
 category:({ page, limit, search }: IQueryProps) => Promise<void>;   
}


export const CategoryContext = createContext<ICategoryContext>({
    category:async():Promise<void> => {}
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
            setPagination((prev) => ({
                ...prev,
                total:respose.result.options.total,
                current: page,
                pageSize: limit,
            }));
        } catch (exception) {
         throw exception   
        }
    }

      useEffect(() => {
            allCategories({
                page: pagination.current,
                limit: pagination.pageSize,
            });
        }, []);
    
        useEffect(() => {
            const timer = setTimeout(() => {
                allCategories({
                    page: pagination.current,
                    limit: pagination.pageSize,
                    search: search,
                });
            }, 500);
            return () => clearTimeout(timer);
        }, [search]);
    
    return (
        <>
       <CategoryContext.Provider value={{category:allCategories}}>
        {children}
       </CategoryContext.Provider>
        </>
    )
}




