import { createContext } from "react";



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


const UserContext = createContext<>