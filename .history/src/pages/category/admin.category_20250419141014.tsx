import { useEffect, useState } from "react";
import authSvc from "../../services/auth.service";
import categorySVc from "../../services/category.service";
import { TablePaginationConfig,Layout,Typography,Input,Table } from "antd";
import notifcation, { NotificationType } from "../../utilities/helpers";
import { NavLink } from "react-router";
import {PlusOutlined } from "@ant-design/icons";
import { IResponseType } from "../../services/http.service";

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
// Removed duplicate IResponseType interface to avoid type conflicts.
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
            setLoading(true)
            const response:IResponseType = await categorySVc.getRequest('/category/all',{
                params:{
                    page:page,
                    limit:limit,
                    search:search
                }
            })
            setData(response.result.data)
            console.log(response)


        } catch (exception) {
            notifcation("Sorry, the list od categories cannot be displayed now.Please try again after some time",NotificationType.ERROR)
        } finally {
            setLoading(false)
        }
    }

    useEffect (() =>{
        getAllCategory(
            {
            page:pagination.current,
            limit:pagination.pageSize
            }
        )
    },[])

    useEffect(() => {
        const timer = setTimeout(() => { 
          getAllCategory({
            page: pagination.current,
            limit: pagination.pageSize,
            search: search,
          });
        }, 500); 
        return () => {
            clearTimeout(timer);
          };
        }, [search]);
    

    const handleTableChange  = (pagination:TablePaginationConfig) =>{
        setPagination({
            ...pagination
        })

        getAllCategory({
            page:pagination.current,
            limit:pagination.pageSize
        })
    }

    const tableColumns = [
        {
            title:"Category",
            dataIndex:"title"
        },
        {
            title:"Url",
            dataIndex:"slug"
        },
        {
            title:"Image",
            dataIndex:"image"
        },
        {
            title:"Status",
            dataIndex:"status"
        },
        {
            title:"Action",
            dataIndex:"_id"
        }
    ] 

    return (
        <>
         <Layout.Content className="rounded-md p-5">
      <div className="border-b border-b-gray-500">
        <Typography.Title className=" text-3xl p-2">All Categories</Typography.Title>
      </div>
      <div className="flex justify-between mt-3">
        <Input.Search  enterButton placeholder="Search category" onChange={(e) => {
            setSearch(e.target.value)
        }} className="w-100!" />
        <NavLink to="/admin/category/create" className=" border-2 border-blue-500  rounded-md p-1.5">
          <PlusOutlined/> Add category
        </NavLink>
      </div>
      <div className="mt-3">
        <Table
          size="small"
          columns={tableColumns}
            dataSource={data}
            rowKey={(record) => record._id}
            pagination={pagination}
            loading={{ spinning: loading, tip: 'Loading categories...', size: 'small' }}
            onChange={handleTableChange} 
        />
      </div>
    </Layout.Content>

        </>
    )
}
export default CategoryList;