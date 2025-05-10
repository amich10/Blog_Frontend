import { TablePaginationConfig } from "antd";
import { createContext, ReactNode, useState } from "react";



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


interface IUserContext {
    data:IUserType[];
    getAllUsers:(params?:IQueryProps)

}

type IQueryProps = {
    page?: number;
    limit?: number;
    search?: string | null;
}

type IChildren ={
    children:ReactNode
}

const UserContext = createContext<IUserContext | undefined>(undefined)


export const UserProvider = ({children}:IChildren) => {

    const [user,setUser] = useState<IUserType[]>([])
    const [loading,setLoading] = useState<boolean>(false)
    const [search,setSearch] = useState<string>('')
    const [pagination,setPagination] = useState<TablePaginationConfig>({
        total:0,
        pageSize:10,
        current:1
    })

    const getAllUser = ({page=pagination.current, limit = pagination.pageSize,search=""}) =>{
        try {
            
        } catch (exception) {
            
        }
    }

    return(
        <>
        <UserContext.Provider 
        value={

        }>
            {children}
        </UserContext.Provider>
        </>
    )
}
