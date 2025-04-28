import React, { useRef } from "react";
import { Button, Layout, List, Avatar, Space } from "antd";
import {
  LeftOutlined,
  LikeOutlined,
  MessageOutlined,
  RightOutlined,
  StarOutlined,
} from "@ant-design/icons";

const { Content } = Layout;

const data = Array.from({ length: 23 }).map((_, i) => ({
  href: "https://ant.design",
  title: `ant design part ${i}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  description:
    "Ant Design, a design language for background applications, is refined by Ant UED Team.",
  content:
    "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
}));

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

const ListPosts: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (offset: number) => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += offset;
    }
  };

  const handleCategoryClick = (category: string) => {
    console.log("Category clicked:", category);
  };

  return (
    <Content className="shadow-xl rounded-md bg-white">
      <div className="flex h-full">
        <div className="w-3/4 border-r border-gray-200 h-full px-20">
          {/* Category Slider */}
          <div className="flex flex-row w-full justify-center items-center gap-3 p-6 border-b border-gray-100">
            <Button
              icon={<LeftOutlined />}
              className="!text-[#4f6f52] !border-none"
              onClick={() => scroll(-150)}
            />
            <div
              ref={sliderRef}
              className="flex gap-3 overflow-x-auto scroll-smooth scrollbar-hide  px-2 flex-1"
            >
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 bg-gray-100 hover:bg-[#4f6f52] hover:text-white px-4 py-1 rounded-b-sm cursor-pointer transition duration-300 whitespace-nowrap"
                  onClick={() => handleCategoryClick(category)}
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

          {/* Blog Post List */}
          <List
            className="py-5"
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => console.log(page),
              pageSize: 3,
            }}
            dataSource={data}
            renderItem={(item) => (
              <List.Item
                key={item.title}
                actions={[
                  <IconText
                    icon={StarOutlined}
                    text="156"
                    key="list-vertical-star-o"
                  />,
                  <IconText
                    icon={LikeOutlined}
                    text="156"
                    key="list-vertical-like-o"
                  />,
                  <IconText
                    icon={MessageOutlined}
                    text="2"
                    key="list-vertical-message"
                  />,
                ]}
                extra={
                  <img
                    width={272}
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
                }
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={<a href={item.href}>{item.title}</a>}
                  description={item.description}
                />
                {item.content}
              </List.Item>
            )}
          />
        </div>
        <div className="w-1/4 h-full p-6">hello</div>
      </div>
    </Content>
  );
};

export default ListPosts;
