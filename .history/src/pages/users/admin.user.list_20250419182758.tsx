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

    useEffect(() =>{
        time
    })
    return (
        <>
        helllo
        </>
    )
}

export default UserList;