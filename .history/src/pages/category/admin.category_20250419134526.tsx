import { useState } from "react";
import authSvc from "../../services/auth.service";
import categorySVc from "../../services/category.service";
import { TablePaginationConfig } from "antd";
import notifcation, { NotificationType } from "../../utilities/helpers";


export interface IResult {
    
    image: {
        url: string;
        optimizedUrl: string;
    };
    _id: string;
    title: string;
    slug: string;
    parentId: string | null;
    status: string;
    createdBy: {
        _id: string;
        username: string;
        email: string;
        role: string;
        status: string;
    };
    updatedBy: any;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IResponseType {
    result: IResult 
    status:number
}

export interface IQueryProps {
    page?:number,
    limit?:number,
    search?:string | null
}

const CategoryList = () =>{

    const [data,setData] = useState<Array<IResult>>()

    const [loading,setLoading] = useState<boolean>(true)

    const [pagination,setPagination] = useState<TablePaginationConfig>({
        total:0,
        pageSize:4,
        current:1
    })
    const [search,setSearch] = useState<string>('')

    const getAllCategory = async({page=pagination.current,limit=pagination.pageSize,search=''}:IQueryProps) =>{
        try {
            const response:IResponseType = await categorySVc.getRequest('/category/all',{
                params:{
                    page:page,
                    limit:limit,
                    search:search
                }
            })

            console.log(response)

        } catch (exception) {
            notifcation("Sorry, the list od categories cannot be displayed now.Please try again after some time",NotificationType.ERROR)
        }
    }

    return (
        <>
        

        </>
    )
}
export default CategoryList;