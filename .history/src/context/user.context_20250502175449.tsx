import { createContext, ReactNode } from "react";



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


}

type IChildren{
    children:ReactNode
}

const UserContext = createContext<IUserContext | undefined>(undefined)


export const UserProvider = ({children}:IChildren) => {
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

export const useUser = ():IUserContext