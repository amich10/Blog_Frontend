import React, { useEffect, useRef, useState } from "react";
import { Button, Layout, List, Avatar, Space, Card, TablePaginationConfig } from "antd";
import {
  LeftOutlined,
  LikeOutlined,
  MessageOutlined,
  RightOutlined,
} from "@ant-design/icons";
import postSvc from "../../../services/post.service";
import { IQueryProps, useCategory } from "../../../context/category context/category.context";

const { Content } = Layout;


const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);


const recommendedTopics = ["React", "TypeScript", "UI/UX", "Node.js", "Cloud"];

const followSuggestions = [
  {
    name: "Jane Doe",
    avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=Jane",
  },
  {
    name: "John Smith",
    avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=John",
  },
  {
    name: "Alice Lee",
    avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=Alice",
  },
];

export interface IBlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  tags: string[];
  categoryId: {
    image: {
      url: string;
      optimizedUrl: string;
    };
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
  likes: string[]; // Array of user IDs or usernames
  commentsCount: number;
  publishedAt: string; // ISO date string
  images: {
    url: string;
    optimizedUrl: string;
    _id: string;
  }[];
  updatedBy: string; // User ID
  excerpt: string;
  createdAt: string; 
  updatedAt: string; 
  __v: number;
}

const ListPosts: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (offset: number) => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += offset;
    }
  };

  const [posts, setPosts] = useState<Array<IBlogPost>>([]);
  const { data } = useCategory();
  const [search,setSearch] = useState<string>("")
  const [loading,setLoading] = useState<boolean>(false)
  const [pagination,setPagination] = useState<TablePaginationConfig>({
    pageSize:0,
    current:1,
    total:0
  })

  const retrivePosts = async ({page = pagination.current, limit=pagination.pageSize, search=""}:IQueryProps) => {
    try {
      setLoading(true)
      let response = await postSvc.getRequest("/post/all",{
        params:{
          limit:limit,
          page:page,
          search:search
        }
      });
      setPosts(response.result.data);
      setPagination((prev) =>({
        ...prev,
        pageSize:limit,
        current:page,
        total:res
      }))
      console.log(response.result.data);
    } catch (exception) {
      console.log(exception)
      throw exception
    } finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    retrivePosts();
  }, []);

  return (
    <Content className="shadow-xl rounded-md bg-white relative">
      <div className="flex h-full">
        {/* Left Panel */}
        <div className="w-3/4 border-r border-gray-200 h-full px-6">
          {/* Categories */}
          <div className="flex items-center gap-3 p-6 border-b border-gray-100 sticky top-0">
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

          {/* Blog List */}
          <List
            className="py-6"
            itemLayout="vertical"
            size="large"
            dataSource={posts}
            renderItem={(item) => (
              <List.Item
                key={item._id}
                actions={[
                  <IconText
                    icon={LikeOutlined}
                    text={item.commentsCount.toString()}
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
                  avatar={<Avatar src={item.images[0]?.optimizedUrl} />}
                  title={
                    <a
                      href={item.title}
                      className="text-[#4f6f52] hover:underline"
                    >
                      {item.title}
                    </a>
                  }
                  description={item.excerpt}
                />
              </List.Item>
            )}
          />
        </div>

        {/* Right Sidebar */}
        <div className="w-1/4 h-full p-6 space-y-8 sticky top-0 ">
          {/* Featured Posts */}
          <div>
            <h2 className="text-lg font-bold mb-4 text-[#4f6f52]">
              Featured Posts
            </h2>
            <List
              itemLayout="horizontal"
              dataSource={posts.slice(0, 3)} // Limit to three posts
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={<span className="text-[#4f6f52]">{item.title}</span>}
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
              dataSource={followSuggestions}
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
                    avatar={<Avatar src={user.avatar} />}
                    title={<span className="text-[#4f6f52]">{user.name}</span>}
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
