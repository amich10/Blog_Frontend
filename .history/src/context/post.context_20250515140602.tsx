import { createContext, ReactNode, useContext, useState } from "react";
import { IPostsType, IQueryType } from "../interfacers or types/interfaces";
import { Spin, TablePaginationConfig } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useAuth } from "./auth.context";

interface IPostContext {
  posts: IPostsType[];
  getallPosts: (params?: IQueryType) => void;
}
type IChildren = {
  children: ReactNode;
};

const PostContext = createContext<IPostContext | undefined>(undefined);

export const PostProvider = ({ children }: IChildren) => {
  const [posts, setPosts] = useState<IPostsType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
   const [search, setSearch] = useState<string>("");
    const [pagination, setPagination] = useState<TablePaginationConfig>({
      total: 0,
      pageSize: 10,
      current: 1,
    });
  

  const { userDetails } = useAuth();


    const getAllPosts = async({
        
    }) =>{

        try {
          setLoading(true) 
           const posts = await postSvc.getRequest("/post/all", {
                params: {
                    limit: limit,
                    page: page,
                    search: search,
                },
            });

        } catch (exception) {
            
        }finally {
            setLoading(false)
        }
    }


  return (
    <>
      <PostContext.Provider
        value={{
          posts,
          getallPosts: getAllPosts,
        }}
      >
        {loading ? (
          <Spin tip="Loading..." indicator={<LoadingOutlined />}></Spin>
        ) : (
          children
        )}
      </PostContext.Provider>
    </>
  );
};

export const usePost = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("UsePors must be used within a PostProvider");
  }
  return context;
};
