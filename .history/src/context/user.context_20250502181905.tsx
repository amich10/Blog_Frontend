import { TablePaginationConfig } from "antd";
import { createContext, ReactNode, useState } from "react";
import userSvc from "../services/user.service";



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
    users:IUserType[];
    getAllUsers:(params?:IQueryProps)=>void;

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

    const [users,setUsers] = useState<IUserType[]>([])
    const [loading,setLoading] = useState<boolean>(false)
    const [search,setSearch] = useState<string>('')

    const getAllUser = async() =>{
        try {
            setLoading(true)
            const response = await userSvc.getRequest('/user/all')
            console.log(response)
            setUsers(response.result.data)
        } catch (exception) {
            console.log(exception)
            throw exception
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
