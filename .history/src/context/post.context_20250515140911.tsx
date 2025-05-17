import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { IPostsType, IQueryType } from "../interfacers or types/interfaces";
import { Spin, TablePaginationConfig } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useAuth } from "./auth.context";
import postSvc from "../services/post.service";
import notifcation, { NotificationType } from "../utilities/helpers";

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

  const getAllPosts = async ({
    page = pagination.current,
    limit = pagination.pageSize,
    search = "",
  }) => {
    try {
      setLoading(true);
      const response = await postSvc.getRequest("/post/all", {
        params: {
          limit: limit,
          page: page,
          search: search,
        },
      });
      setPosts(response.result.data)
       setPagination((prev) => ({
        ...prev,
        total: response.result.options.total,
        current: page,
        pageSize: limit,
      }));
    } catch (exception) {
        console.log(exception)
        notifcation("Posts cannot be fetched at the moment.",NotificationType.ERROR)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(userDetails){
        get
    }
  },[userDetails])

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
