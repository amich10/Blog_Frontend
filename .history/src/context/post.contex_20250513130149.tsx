import React, { createContext, useContext, useEffect, useState } from "react";
import { TablePaginationConfig } from "antd";
import notifcation, { NotificationType } from
import { useAuth } from "../auth.context";

export interface IResult {
  image: {
    url: string;
    optimizedUrl: string;
  };
  _id: string;
  title: string;
  slug: string;
  parentId: string | null;
  status: string;
  createdBy: any;
  updatedBy: any;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IQueryProps {
  page?: number;
  limit?: number;
  search?: string | null;
}

interface ICategoryContext {
  data: IResult[];
  loading: boolean;
  pagination: TablePaginationConfig;
  search: string;
  getAllCategory: (params?: IQueryProps) => void;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setPagination: React.Dispatch<React.SetStateAction<TablePaginationConfig>>;
}

const CategoryContext = createContext<ICategoryContext | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<IResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    total: 0,
    pageSize: 10,
    current: 1,
  });

  const { userDetails } = useAuth();
  
  const getAllCategory = async ({
    page = pagination.current,
    limit = pagination.pageSize,
    search = "",
  }: IQueryProps = {}) => {
    try {
      setLoading(true);
      const response: IResponseType = await categorySvc.getRequest("/category/all", {
        params: { page, limit, search },
      });
      setData(response.result.data);
      setPagination((prev) => ({
        ...prev,
        total: response.result.options.total,
        current: page,
        pageSize: limit,
      }));
    } catch (error) {
      notifcation("Could not fetch categories. Try again later.", NotificationType.ERROR);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userDetails) {
      getAllCategory();
    }
  }, [userDetails]);

  // Debounced search - only after user is authenticated
  useEffect(() => {
    if (userDetails) {
      const timer = setTimeout(() => {
        getAllCategory({ search });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [search, userDetails]);

  return (
    <CategoryContext.Provider
      value={{
        data,
        loading,
        pagination,
        search,
        getAllCategory,
        setSearch,
        setPagination,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = (): ICategoryContext => {
  const context = useContext(CategoryContext);
  if (!context) throw new Error("useCategory must be used within a CategoryProvider");
  return context;
};
