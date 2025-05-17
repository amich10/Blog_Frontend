import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IPostsType } from "../interfacers or types/interfaces";
import { Spin, TablePaginationConfig } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useAuth } from "./auth.context";
import postSvc from "../services/post.service";
import notifcation, { NotificationType } from "../utilities/helpers";
import { IQueryProps } from "./category.context";

interface IPostContext {
  posts: IPostsType[];
  getallPosts: (params: IQueryProps) => void;
  pagination: TablePaginationConfig;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setPagination: React.Dispatch<React.SetStateAction<TablePaginationConfig>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
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
    pageSize: 100,
    current: 1,
  });

  const { userDetails } = useAuth();

  const getallPosts = async ({
    page = pagination.current,
    limit = pagination.pageSize,
    search = "",
  }: IQueryProps) => {
    try {
      setLoading(true);
      const response = await postSvc.getRequest("/post/all", {
        params: {
          limit: limit,
          page: page,
          search: search,
        },
      });
      setPosts(response.result.data);
      setPagination((prev) => ({
        ...prev,
        total: response.result.options.total,
        current: page,
        pageSize: limit,
      }));
    } catch (exception) {
      console.log(exception);
      notifcation(
        "Posts cannot be fetched at the moment.",
        NotificationType.ERROR
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userDetails) {
      getallPosts({
        page: pagination.current,
        limit: pagination.pageSize,
        search: "",
      });
    }
  }, [userDetails]);

  useEffect(() => {
    if (userDetails) {
      const timer = setTimeout(() => {
        getallPosts({
          page: pagination.current,
          limit: pagination.pageSize,
          search,
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [search, userDetails]);

  return (
    <>
      <PostContext.Provider
        value={{
          posts,
          getallPosts,
          pagination,
          search,
          setSearch,
          setPagination,
          loading,
          setLoading
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
    throw new Error("usePost must be used within a PostProvider");
  }
  return context;
};
