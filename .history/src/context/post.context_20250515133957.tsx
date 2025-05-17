import { createContext, useContext } from "react";




interface IPostContex {
    post
}

const PostContext = createContext()

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