import { createContext, useContext } from "react";
import { IPostsType, IQueryType } from "../interfacers or types/interfaces";




interface IPostContext {
    posts:IPostsType[];
    getallPosts:(params?:IQueryType) => void;
}

const PostContext = createContext<IPostContext | >()

export const PostProvider = ({}) => {
    return (
        <>
        </>
    )
}

export const usePost = () => {
    const context = useContext(PostContext)
    if(!context){
        throw new Error("UsePors must be used within a PostProvider")
    }
    return context
}