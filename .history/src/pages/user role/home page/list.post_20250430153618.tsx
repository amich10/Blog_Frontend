import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Layout,
  List,
  Avatar,
  Space,
  Card,
  TablePaginationConfig,
  Input,
  Pagination,
} from "antd";
import {
  LeftOutlined,
  LikeOutlined,
  MessageOutlined,
  RightOutlined,
} from "@ant-design/icons";
import postSvc from "../../../services/post.service";
import {
  IQueryProps,
  useCategory,
} from "../../../context/category context/category.context";
import { useNavigate } from "react-router";
import { IUserType } from "../../users/admin.user.list";
import userSvc from "../../../services/user.service";

const { Content } = Layout;
const { Search } = Input;

const IconText = ({
  icon,
  text,
}: {
  icon: React.FC;
  text: string;
}) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const recommendedTopics = ["React", "TypeScript", "UI/UX", "Node.js", "Cloud"];






export interface IBlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  tags: string[];
  categoryId: {
    image: { url: string; optimizedUrl: string };
    _id: string;
    title: string;
    slug: string;
    status: "active" | "inactive";
  };
  authorId: {
    _id: string;
    username: string;
    email: string;
    role: "admin" | "user";
    status: "active" | "inactive";
  };
  status: "published" | "draft" | "inactive";
  views: number;
  likes: string[];
  commentsCount: number;
  publishedAt: string;
  images: { url: string; optimizedUrl: string; _id: string }[];
  updatedBy: string;
  excerpt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const ListPosts: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scroll = (offset: number) => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += offset;
    }
  };


  const [users, setUsers] = useState<IUserType[]>([])


const retrieveUsers = async() =>{
  try {
    const response = await userSvc.getRequest('user/all')
    setUsers(response.result.data)
  } catch (exception) {
    console.log(exception)
  }
}

useEffect(() =>{
  retrieveUsers()
},[])


  const [posts, setPosts] = useState<IBlogPost[]>([]);
  const { data } = useCategory();
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  const retrievePosts = async ({
    page = pagination.current,
    limit = pagination.pageSize,
    search = "",
  }: IQueryProps) => {
    try {
      setLoading(true);
      const response = await postSvc.getRequest("/post/all", {
        params: { page, limit, search },
      });

      setPosts(response.result.data);
      setPagination((prev) => ({
        ...prev,
        pageSize: limit,
        current: page,
        total: response.result.options.total,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    retrievePosts({
      page: pagination.current,
      limit: pagination.pageSize,
      search: search,
    });
  }, []);

  // Search debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      retrievePosts({
        page: 1,
        limit: pagination.pageSize,
        search: search,
      });
      setPagination((prev) => ({ ...prev, current: 1 }));
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const handlePageChange = (page: number, pageSize?: number) => {
    const finalPageSize = pageSize || pagination.pageSize!;
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: finalPageSize,
    }));
    retrievePosts({
      page,
      limit: finalPageSize,
      search,
    });
  };

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
              onClick={() => scroll(-150)}
            />
            <div
              ref={sliderRef}
              className="flex gap-3 overflow-x-auto scroll-smooth scrollbar-hide flex-1 px-2"
            >
              {data.map((category, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 bg-gray-100 hover:bg-[#4f6f52] hover:text-white px-4 py-1 rounded-full cursor-pointer transition duration-300 whitespace-nowrap text-sm"
                >
                  {category.title}
                </div>
              ))}
            </div>
            <Button
              icon={<RightOutlined />}
              className="!text-[#4f6f52] !border-none"
              onClick={() => scroll(150)}
            />
          </div>

          {/* Search Bar */}
          <div className="my-4">
            <Search
              placeholder="Search blog posts..."
              allowClear
              style={{width:"100%"}}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onSearch={(val) => setSearch(val)}
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
                <List.Item
                key={item._id}
                actions={[
                  <IconText
                  icon={LikeOutlined}
                  text={item.likes.length.toString()}
                  key="like"
                  />,
                  <IconText
                  icon={MessageOutlined}
                  text={item.commentsCount.toString()}
                  key="message"
                  />,
                ]}
                extra={
                  <img
                  width={272}
                  alt="cover"
                  src={item.images[0]?.optimizedUrl}
                  className="rounded-md h-30 w-50"
                  />
                }
                >
                <List.Item.Meta
                  avatar={<Avatar src={users.find(user => user._id === item.authorId._id)?.image?.optimizedUrl} />}
                  title={
                  <a
                    onClick={() => navigate(`/blogs/${item.slug}`)}
                    className="text-[#4f6f52] hover:underline cursor-pointer"
                  >
                   <span className="text-[#4f6f52] font-serif font-semibold"> {item.title}</span>
                  </a>
                  }
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
          {/* Featured Posts */}
          <div>
            <h2 className="text-lg font-bold mb-4  text-[#4f6f52]">
              Featured Posts
            </h2>
            <List
              itemLayout="horizontal"
              dataSource={posts.slice(0, 3)}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <span className="text-[#4f6f52] font-serif font-semibold">{item.title}</span>
                    }
                    description={item.excerpt}
                  />
                </List.Item>
              )}
            />
          </div>

          {/* Recommended Topics */}
          <div>
            <h2 className="text-lg font-bold mb-4 text-[#4f6f52]">
              Recommended Topics
            </h2>
            <div className="flex flex-wrap gap-2">
              {recommendedTopics.map((topic) => (
                <Button
                  key={topic}
                  type="default"
                  shape="round"
                  size="small"
                  className="!border-[#4f6f52] !text-[#4f6f52] hover:!bg-[#4f6f52] hover:!text-white transition duration-300"
                >
                  {topic}
                </Button>
              ))}
            </div>
          </div>

          {/* Who to Follow */}
            <Card
            title={<span className="text-[#4f6f52]">Who to Follow</span>}
            bordered={false}
            className="shadow-md rounded-md"
            >
            <List
              itemLayout="horizontal"
              dataSource={users.sort(() => 0.5 - Math.random()).slice(0, 5) || []}
              renderItem={(user) => (
              <List.Item
                actions={[
                <Button
                  type="primary"
                  size="small"
                  className="!bg-[#4f6f52] hover:!bg-[#3d5842]"
                  key="follow"
                >
                  Follow
                </Button>,
                ]}
              >
                <List.Item.Meta
                avatar={<Avatar src={user?.image?.optimizedUrl} />}
                title={
                  <span className="text-[#4f6f52]">{user?.username}</span>
                }
                />
              </List.Item>
              )}
            />
            </Card>
        </div>
      </div>
    </Content>
  );
};

export default ListPosts;
