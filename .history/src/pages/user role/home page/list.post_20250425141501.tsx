import { Layout, List } from "antd";
import React from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';







const data = Array.from({ length: 23 }).map((_, i) => ({
  href: 'https://ant.design',
  title: `ant design part ${i}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  description:
    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));


const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);


const ListPosts = () => {
  return (
    <>
      <Layout.Content className="shadow-xl rounded-md bg-white">
        <div className="flex h-full">
          <div className="w-3/4 border-r border-gray-200 h-full">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold mb-2">Categories</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="text-blue-600 hover:underline">Technology</a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">Design</a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">Programming</a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">Business</a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">Lifestyle</a>
              </li>
            </ul>
          </div>
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 3,
              }}
              dataSource={data}
              /* footer={
                <div>
                  <b>ant design</b> footer part
                </div>
              } */
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
          <div className="w-1/4 h-full">
              hello
          </div>
        </div>
      </Layout.Content>
    </>
  );
};
export default ListPosts;
