import React, { useEffect, useState, useRef } from "react";
import { List, Button, Avatar, Input, Pagination, Layout } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import postSvc from "../../../services/post.service";
import { useCategory } from "../../../context/category.context";
import { useUsers } from "../../../context/user.context";
import { useAuth } from "../../../context/auth.context";
import { IQueryProps } from "../../../context/category context/category.context";
import { FormOutlined, RightOutlined, LeftOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Search } = Input;

const ListPosts: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [posts, setPosts] = useState([]);
  const { data } = useCategory();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  const retrievePosts = async ({ page = pagination.current, limit = pagination.pageSize, search = "", categoryId = null }: IQueryProps & { categoryId: string | null }) => {
    try {
      setLoading(true);
      const response = await postSvc.getRequest("/post/all", {
        params: { page, limit, search, categoryId },
      });
      setPosts(response.result.data);
      setPagination(prev => ({
        ...prev,
        current: page,
        pageSize: limit,
        total: response.result.options.total,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // On mount and every category or search change, fetch posts
  useEffect(() => {
    if (!selectedCategoryId && search === "") {
      retrievePosts({
        page: pagination.current,
        limit: pagination.pageSize,
        search: search,
        categoryId: null,
      });
    }
  }, [selectedCategoryId, search]);

  // Re-fetch posts when returning to the blog list page
  useEffect(() => {
    // Check if the user navigated to `/blogs`
    if (location.pathname === "/blogs") {
      retrievePosts({
        page: pagination.current,
        limit: pagination.pageSize,
        search,
        categoryId: selectedCategoryId,
      });
    }
  }, [location.pathname, location.search, pagination.current, pagination.pageSize]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    setPagination(prev => ({
      ...prev,
      current: page,
      pageSize: pageSize || pagination.pageSize,
    }));
    retrievePosts({
      page,
      limit: pageSize || pagination.pageSize,
      search,
      categoryId: selectedCategoryId,
    });
  };

  const { users } = useUsers();
  const { userDetails } = useAuth();
  const loggedInuserId = userDetails._id;

  return (
    <Content className="shadow-xl rounded-md bg-white relative">
      <div className="flex h-full">
        {/* Left Panel */}
        <div className="w-3/4 border-r border-gray-200 h-full px-6">
          {/* Category Scrollbar */}
          <div className="flex items-center gap-3 p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
            <Button
              icon={<LeftOutlined />}
              className="!text-[#4f6f52] !border-none"
              onClick={() => setPagination((prev) => ({ ...prev, current: prev.current - 1 }))}
            />
            <div className="flex gap-3 overflow-x-auto scroll-smooth scrollbar-hide flex-1 px-2">
              {data.map((category) => (
                <div
                  key={category._id}
                  onClick={() => {
                    setSelectedCategoryId(category._id);
                    retrievePosts({
                      page: 1,
                      limit: pagination.pageSize,
                      search,
                      categoryId: category._id,
                    });
                    setPagination((prev) => ({ ...prev, current: 1 }));
                  }}
                  className={`flex-shrink-0 px-4 py-1 rounded-full cursor-pointer transition duration-300 ${
                    selectedCategoryId === category._id
                      ? "bg-[#4f6f52] text-white"
                      : "bg-gray-100 hover:bg-[#4f6f52] hover:text-white"
                  }`}
                >
                  {category.title}
                </div>
              ))}
            </div>
            <Button
              icon={<RightOutlined />}
              className="!text-[#4f6f52] !border-none"
              onClick={() => setPagination((prev) => ({ ...prev, current: prev.current + 1 }))}
            />
          </div>

          {/* Search Bar */}
          <div className="my-4 mx-6">
            <Search
              placeholder="Search blog posts..."
              allowClear
              style={{ width: "100%" }}
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          {/* Blog List */}
          <List
            className="py-6"
            loading={loading}
            itemLayout="vertical"
            size="large"
            dataSource={posts}
            renderItem={(item) => (
              <List.Item key={item._id} className="border border-gray-100 rounded-2xl gap-2 mb-4 shadow">
                <List.Item.Meta
                  avatar={<Avatar src={users.find((user) => user._id === item.authorId._id)?.image?.optimizedUrl} />}
                  title={<a onClick={() => navigate(`/blogs/${item.slug}`)}>{item.title}</a>}
                  description={item.excerpt}
                />
              </List.Item>
            )}
          />

          {/* Pagination */}
          <div className="text-center my-4">
            <Pagination
              current={pagination.current}
              pageSize={pagination.pageSize}
              total={pagination.total}
              onChange={handlePageChange}
            />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-1/4 h-full p-6 space-y-8 sticky top-0">
          <Button
            type="primary"
            className="!bg-[#4f6f52] hover:!bg-[#3d5842] w-full h-20! flex justify-center items-center mb-3! shadow-lg! border-b-2! border-gray-300!"
            onClick={() => navigate("/blogs/create")}
          >
            <div className="flex flex-col gap-1">
              <span className="text-white! font-semibold text-lg">
                <FormOutlined /> Write your own Blog
              </span>
              <span className="italic">"{randomIdea}"</span>
            </div>
          </Button>
        </div>
      </div>
    </Content>
  );
};

export default ListPosts;
