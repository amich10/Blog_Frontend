import { TablePaginationConfig } from "antd";
import { useState } from "react";
import { IResponseType } from "../../services/http.service";
import userSvc from "../../services/user.service";

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
    const [data,setData] = useState<IUserType>()
    const [loading,setLoadin] = useState<boolean>(true)

    const [pagination,setPagination] = useState<TablePaginationConfig>({
        pageSize:6,
        current:1,
        total:0
    })

    const [search,setSearch] = useState<string>('')

    const getAllUsers = async() =>{
        try {
            const response: IResponseType = await userSvc.getRequest('/user/all',{
                params:{
                    limit:pagination.pageSize,
                    page:pagination.current,
                    search:search
                }
            })
            setData(response.result.data)
            setPagination((prev) => (
                {
                    ...prev,
                    pageSize: response.result.data.options.limit || prev.pageSize,
                    current: response.result.page || prev.current
                }
            ))
        } catch (exception) {
            
        }
    }

    return (
        <>
        
        </>
    )
}

export default UserList;