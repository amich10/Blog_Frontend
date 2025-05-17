import { createContext, useContext } from "react";



const PostContext = createContext()

export const PostProvider = ({}) => {
    return (
        <>
        </>
    )
}

export const usePost = () => {
    const context = useContext(PostContext)
    if(!context)
}