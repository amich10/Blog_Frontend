import { useState } from "react";
import authSvc from "../../services/auth.service";
import categorySVc from "../../services/category.service";
import { TablePaginationConfig } from "antd";


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

export interface IPaginationProps {
    page?:number,
    limit?:number,
    search?:string | null
}

const CategoryList = () =>{
    const [data,setData] = useState<Array<>>()

    const [pagination,setPagination] = useState<TablePaginationConfig>({
        total:0,
        pageSize:4,
        current:1
    })

    const getAllCategory = async(url:string,) =>{
        try {
            const response:IResponseType = await categorySVc.getRequest('/category/all',{
                params:{
                    page:page,
                    limit:limit,
                    total:total
                }
            })
        } catch (exception) {
            
        }
    }

    return (
        <>
        

        </>
    )
}
export default CategoryList;