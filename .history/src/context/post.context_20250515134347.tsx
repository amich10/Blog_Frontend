import { createContext, ReactNode, useContext, useState } from "react";
import { IPostsType, IQueryType } from "../interfacers or types/interfaces";
import { Spin } from "antd";




interface IPostContext {
    posts:IPostsType[];
    getallPosts:(params?:IQueryType) => void;
}
type IChildren = {
  children: ReactNode;
};

const PostContext = createContext<IPostContext | undefined>(undefined)

export const PostProvider = ({children}:IChildren) => {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <>
           <>
      <PostContext.Provider
        value={{
          users,
          getAllUsers,
        }}
      >
        {loading ? (
          <Spin tip="Loading..." indicator={<Loa />}></Spin>
        ) : (
          children
        )}
      </PostContext.Provider>
    </>  
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