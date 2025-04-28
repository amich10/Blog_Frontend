import { Layout, List } from "antd";
import React, { useState } from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';

import type { RadioChangeEvent } from 'antd';
import { Radio, Tabs } from 'antd';





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



type TabPosition = 'left' | 'right' | 'top' | 'bottom';

const ListPosts = () => {
  const [mode, setMode] = useState<TabPosition>('top');

  const handleModeChange = (e: RadioChangeEvent) => {
    setMode(e.target.value);
  };

  return (
    <>
      <Layout.Content className="shadow-xl rounded-md bg-white">
        <div className="flex h-full">
          <div className="w-1/4 border-r border-gray-200 h-full p-4">
            <Radio.Group onChange={handleModeChange} value={mode} style={{ marginBottom: 8 }}>
              <Radio.Button value="top">Horizontal</Radio.Button>
              <Radio.Button value="left">Vertical</Radio.Button>
            </Radio.Group>
            <Tabs
              defaultActiveKey="1"
              tabPosition={mode}
              style={{ height: 220 }}
              items={Array.from({ length: 30 }, (_, i) => {
                const id = String(i);
                return {
                  label: `Tab-${id}`,
                  key: id,
                  disabled: i === 28,
                  children: `Content of tab ${id}`,
                };
              })}
            />
          </div>
          <div className="w-3/4 h-full p-4">
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
        </div>
      </Layout.Content>
    </>
  );
};
export default ListPosts;
