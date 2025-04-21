import { TablePaginationConfig } from "antd";
import { useEffect, useState } from "react";
import { IResponseType } from "../../services/http.service";
import userSvc from "../../services/user.service";
import notifcation, { NotificationType } from "../../utilities/helpers";
import { IQueryProps } from "../category/admin.category";

export interface IUserType {
    image: {
        url: string;
        optimizedUrl: string;
    };
    _id: string;
    fullName: string;
    username: string;
    email: string;
    password: string;
    role: string;
    phone: string;
    address: string;
    bio: string;
    status: string;
    activationToken: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    gender: string;
}



const UserList = () =>{
    const [data,setData] = useState<Array<IUserType>>([])
    const [loading,setLoadin] = useState<boolean>(true)

    const [pagination,setPagination] = useState<TablePaginationConfig>({
        pageSize:6,
        current:1,
        total:0
    })

    const [search,setSearch] = useState<string>('')

    const getAllUsers = async({limit=pagination.pageSize, page=pagination.current, search=''}:IQueryProps) =>{
        try {
            const response: IResponseType = await userSvc.getRequest('/user/all',{
                params:{
                    limit:limit,
                    page:page,
                    search:search
                }
            })
            console.log(response)
            setData(response.result.data)
            setPagination((prev) => (
                {
                    ...prev,
                    pageSize: response.result.options.pagination.limit || prev.pageSize,
                    current: response.result.options.pagination.page || prev.current
                }
            ))

            console.log(setPagination)
        } catch (exception) {
            notifcation("Sorry user list cannot be generated now.", NotificationType.ERROR)
        }
    }

    useEffect (() =>{
        getAllUsers({
            limit:pagination.pageSize,
            page:pagination.current

        })
    },[])

    useEffect(() => {
        let timer = setTimeout(() => {
            getAllUsers({
                page: pagination.current,
                limit: pagination.pageSize,
                search: search,
            })
        }, 500)

        return () => clearTimeout(timer)
    })


    const handleTableChange = (pagination:TablePaginationConfig) =>{
        setPagination(pagination)
        getAllUsers({
            page:pagination.current,
            limit:pagination.pageSize,
            search:search
        })
    }


    const tableColumns = [
        {
            title: "Category",
            dataIndex: "title",
            render: (text: string) => (
                <span className="font-medium text-gray-800">{text}</span>
            ),
        },
        {
            title: "Url",
            dataIndex: "slug",
            render: (text: string) => (
                <span className="text-blue-600 italic">{text}</span>
            ),
        },
        {
            title: "Image",
            dataIndex: "image",
            render: (image: IResult["image"]) =>
                image && image.optimizedUrl ? (
                    <img
                        src={image.optimizedUrl}
                        alt="category"
                        className="w-10 h-10 object-cover"
                    />
                ) : (
                    <span className="text-gray-400 italic">No Image</span>
                ),
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (status: string) => (
                <span
                    className={
                        status === "active"
                            ? "px-2 py-1 rounded bg-green-100 text-green-700 text-xs"
                            : "px-2 py-1 rounded bg-red-100 text-red-700 text-xs"
                    }
                >
                    {status}
                </span>
            ),
        },
        {
            title: "Action",
            dataIndex: "_id",
            render: (id: string) => (
              <div className="flex gap-5">
                <NavLink to={"/admin/category"+id} className="text-green-500!">
                <EditOutlined/>
              </NavLink>
              <Popconfirm
               title="Are you sure?"
               description="You cannot revert the deleted item."
               okText="Yes"
               cancelText="Cancel"
               okButtonProps={{className:"bg-red-600!"}}
               cancelButtonProps={{className:"bg-green-600! text-white!"}}
               onConfirm={async() =>{
                try {
                    await categorySVc.deleteRequest('category/delete/'+id)
                    notifcation("Category deleted successfully",NotificationType.SUCCESS)

                    //refresh page after delete 
                    getAllCategory({
                        page:pagination.current,
                        limit:pagination.pageSize
                    })
                } catch (exception) {
                    notifcation("Sorry,error occured in deleting category.Please,try again later",NotificationType.ERROR)
                }
               }}
               >
              <span className="text-red-600!">
                  <DeleteOutlined />
                </span>
                </Popconfirm>
              </div>
              
            ),
        },
    ];


    return (
        <>
        helllo
        </>
    )
}

export default UserList;