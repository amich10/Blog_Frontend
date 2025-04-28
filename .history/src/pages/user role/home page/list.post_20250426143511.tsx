import React, { useEffect, useRef,useState } from "react";
import { Button, Layout, List, Avatar, Space, Card } from "antd";
import {
  LeftOutlined,
  LikeOutlined,
  MessageOutlined,
  RightOutlined,
  StarOutlined,
} from "@ant-design/icons";
import postSvc from "../../../services/post.service";

const { Content } = Layout;

const data = Array.from({ length: 23 }).map((_, i) => ({
  href: "https://ant.design",
  title: `Ant Design Part ${i + 1}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  description:
    "Ant Design, a design language for background applications, refined by Ant UED Team.",
  content:
    "We supply design principles, practical patterns, and high-quality resources to help people create beautiful and efficient prototypes.",
}));

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const categories = [
  "Technology",
  "Design",
  "Business",
  "Health",
  "Science",
  "Travel",
  "Education",
  "Food",
  "Sports",
  "Entertainment",
];

const featuredPosts = [
  { title: "Post 1", description: "Description of Post 1" },
  { title: "Post 2", description: "Description of Post 2" },
  { title: "Post 3", description: "Description of Post 3" },
];

const recommendedTopics = ["React", "TypeScript", "UI/UX", "Node.js", "Cloud"];

const followSuggestions = [
  { name: "Jane Doe", avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=Jane" },
  { name: "John Smith", avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=John" },
  { name: "Alice Lee", avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=Alice" },
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
    status: 'active' | 'inactive';
  };
  authorId: {
    _id: string;
    username: string;
    email: string;
    role: 'admin' | 'user';
    status: 'active' | 'inactive';
  };
  status: 'published' | 'draft' | 'inactive';
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
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}



const ListPosts: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);



  const scroll = (offset: number) => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += offset;
    }
  };

  const [posts,setPosts] = useState<Array<IBlogPost>>([])

  const retrivePosts = async() =>{
    try{
      let response = await postSvc.getRequest('/post/all')
      setPosts(response.result.data)
      console.log(response.result.data)
    }catch(exception){

    }
  }

  useEffect(() =>{
    retrivePosts()
  },[])

  return (
    <Content className="shadow-xl rounded-md bg-white">
      <div className="flex h-full">
        {/* Left Panel */}
        <div className="w-3/4 border-r border-gray-200 h-full px-6">
          {/* Categories */}
          <div className="flex items-center gap-3 p-6 border-b border-gray-100">
            <Button
              icon={<LeftOutlined />}
              className="!text-[#4f6f52] !border-none"
              onClick={() => scroll(-150)}
            />
            <div
              ref={sliderRef}
              className="flex gap-3 overflow-x-auto scroll-smooth scrollbar-hide flex-1 px-2"
            >
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 bg-gray-100 hover:bg-[#4f6f52] hover:text-white px-4 py-1 rounded-full cursor-pointer transition duration-300 whitespace-nowrap text-sm"
                >
                  {category}
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
            pagination={{
              onChange: (page) => console.log(page),
              pageSize: 3,
            }}
            dataSource={posts}
            renderItem={(item) => (
              <List.Item
                key={item.title}
                actions={[
                  <IconText icon={StarOutlined} text="156" key="star" />,
                  <IconText icon={LikeOutlined} text="156" key="like" />,
                  <IconText icon={MessageOutlined} text="2" key="message" />,
                ]}
                extra={
                  <img
                    width={272}
                    alt="cover"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    className="rounded-md"
                  />
                }
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={<a href={item.href} className="text-[#4f6f52] hover:underline">{item.title}</a>}
                  description={item.description}
                />
                <div className="text-gray-600 text-sm">{item.content}</div>
              </List.Item>
            )}
          />
        </div>

        {/* Right Sidebar */}
        <div className="w-1/4 h-full p-6 space-y-8">
          {/* Featured Posts */}
          <div>
            <h2 className="text-lg font-bold mb-4 text-[#4f6f52]">Featured Posts</h2>
            <List
              itemLayout="horizontal"
              dataSource={featuredPosts}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={<span className="text-[#4f6f52]">{item.title}</span>}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </div>

          {/* Recommended Topics */}
          <div>
            <h2 className="text-lg font-bold mb-4 text-[#4f6f52]">Recommended Topics</h2>
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
