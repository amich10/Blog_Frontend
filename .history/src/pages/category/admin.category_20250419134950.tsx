import { useState } from "react";
import authSvc from "../../services/auth.service";
import categorySVc from "../../services/category.service";
import { TablePaginationConfig,Layout,Typography } from "antd";
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
         <Layout.Content className="rounded-md p-5">
      <div className="border-b border-b-gray-500">
        <Typography.Title className="text-center text-white! bg-yellow-500 text-3xl p-2 rounded-md">categorys</Typography.Title>
      </div>
      <div className="flex justify-between mt-3">
        <Input.Search enterButton placeholder="Search categorys" onChange={(e) => {
            setSearch(e.target.value)
        }} className="w-100!" />
        <NavLink to="/admin/category/create" className="bg-green-600! text-white! rounded-md p-1.5 hover:bg-green-800!">
          <PlusOutlined /> Add category
        </NavLink>
      </div>
      <div className="mt-3">
        <Table
          size="small"
          columns={columns}
          dataSource={data}
          rowKey={(record) => record._id}
          pagination={pagination}
          loading={{ spinning: loading, tip: 'categorys loading...', size: 'small' }}
          onChange={handleTableChange}
        />
      </div>
    </Layout.Content>

        </>
    )
}
export default CategoryList;