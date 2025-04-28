"use client"

import type React from "react"
import { useState } from "react"
import { Layout, Input, Button, Menu, Avatar, Badge, Card, List, Typography, Tag, Space } from "antd"
import {
  BellOutlined,
  EditOutlined,
  StarOutlined,
  MessageOutlined,
  MoreOutlined,
  BookmarkOutlined,
} from "@ant-design/icons"

const { Header, Content } = Layout
const { Search } = Input
const { Title, Text, Paragraph } = Typography

interface Article {
  id: number
  title: string
  subtitle: string
  author: {
    name: string
    avatar: string
    publication?: string
  }
  date: string
  readingStats?: {
    likes: number
    comments: number
  }
  image?: string
  featured?: boolean
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("for-you")

  const mainArticles: Article[] = [
    {
      id: 1,
      title: "This new IDE from Google is an absolute game changer",
      subtitle: "This new IDE from Google is seriously revolutionary.",
      author: {
        name: "Tari Ibaba",
        avatar: "/placeholder.svg?height=40&width=40",
        publication: "Coding Beauty",
      },
      date: "Mar 12",
      readingStats: {
        likes: 4800,
        comments: 272,
      },
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "The 5 paid subscriptions I actually use in 2025 as a Staff Software Engineer",
      subtitle: "Tools I use that are cheaper than Netflix",
      author: {
        name: "Jacob Bennett",
        avatar: "/placeholder.svg?height=40&width=40",
        publication: "Level Up Coding",
      },
      date: "Jan 8",
      readingStats: {
        likes: 12700,
        comments: 315,
      },
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const staffPicks: Article[] = [
    {
      id: 3,
      title: "Your story matters: Join us on April 25th for Draft Day 2025",
      subtitle: "",
      author: {
        name: "Scott Lamb",
        avatar: "/placeholder.svg?height=40&width=40",
        publication: "The Medium Blog",
      },
      date: "Apr 17",
      featured: true,
    },
    {
      id: 4,
      title: "I worked for Pope Francis. Here is what he was really like.",
      subtitle: "",
      author: {
        name: "Daniel B. Gallagher",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "3d ago",
      featured: true,
    },
    {
      id: 5,
      title: "My Notes App Is a Beautiful Mess of Creativity and Chaos",
      subtitle: "",
      author: {
        name: "Vaibhavi Naik",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "Apr 17",
      featured: true,
    },
  ]

  const navItems = [
    { key: "for-you", label: "For you" },
    { key: "following", label: "Following" },
    { key: "featured", label: "Featured", tag: "New" },
    { key: "science", label: "Science" },
    { key: "mental-health", label: "Mental Health" },
    { key: "money", label: "Money" },
    { key: "humor", label: "Humor" },
  ]

  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center justify-between bg-white px-6 shadow-sm h-16 sticky top-0 z-50">
        <div className="font-serif text-2xl font-bold text-black">Medium</div>
        <div className="flex-grow mx-4 flex justify-center">
          <Search placeholder="Search" style={{ width: 200 }} />
        </div>
        <div className="flex items-center gap-4">
          <Button type="text" icon={<EditOutlined />}>
            Write
          </Button>
          <Badge dot>
            <Button type="text" icon={<BellOutlined />} />
          </Badge>
          <Avatar src="/placeholder.svg?height=40&width=40" />
        </div>
      </Header>
      <Content className="bg-white p-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center border-b border-gray-100 px-4">
            <Button type="text" shape="circle" icon={<EditOutlined />} className="mr-4" />
            <Menu
              mode="horizontal"
              selectedKeys={[activeTab]}
              onClick={(e) => setActiveTab(e.key)}
              className="border-b-0 flex-1"
            >
              {navItems.map((item) => (
                <Menu.Item key={item.key}>
                  {item.label}
                  {item.tag && (
                    <Tag color="green" className="ml-1 text-xs py-0 px-1 leading-none">
                      {item.tag}
                    </Tag>
                  )}
                </Menu.Item>
              ))}
            </Menu>
          </div>

          <div className="flex px-4 py-6 gap-6 md:flex-row flex-col">
            <div className="flex-1">
              {mainArticles.map((article) => (
                <Card key={article.id} bordered={false} className="mb-6">
                  <div className="flex items-center mb-2">
                    <Avatar size="small" src={article.author.avatar} />
                    <Text className="ml-2 text-sm">
                      In {article.author.publication} by {article.author.name}
                    </Text>
                  </div>
                  <div className="flex gap-4 md:flex-row flex-col">
                    <div className="flex-1">
                      <Title level={3}>{article.title}</Title>
                      <Paragraph className="text-gray-600">{article.subtitle}</Paragraph>
                      <div className="flex justify-between items-center text-gray-500">
                        <Space>
                          <StarOutlined />
                          <Text>{article.date}</Text>
                          {article.readingStats && (
                            <>
                              <Text>{(article.readingStats.likes / 1000).toFixed(1)}K</Text>
                              <MessageOutlined />
                              <Text>{article.readingStats.comments}</Text>
                            </>
                          )}
                        </Space>
                        <Space>
                          <Button type="text" shape="circle" icon={<BookmarkOutlined />} />
                          <Button type="text" shape="circle" icon={<MoreOutlined />} />
                        </Space>
                      </div>
                    </div>
                    {article.image && (
                      <div className="md:w-[200px] md:h-[134px] w-full h-auto overflow-hidden">
                        <img
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            <div className="md:w-80 w-full flex-shrink-0">
              <Title level={4}>Staff Picks</Title>
              <List
                itemLayout="vertical"
                dataSource={staffPicks}
                renderItem={(item) => (
                  <List.Item className="py-4 border-b border-gray-100">
                    <div className="flex items-center mb-2">
                      {item.author.publication && (
                        <div className="flex items-center">
                          <Avatar size="small" style={{ backgroundColor: "#000" }}>
                            M
                          </Avatar>
                          <Text className="ml-2 text-sm">
                            In {item.author.publication} by {item.author.name}
                          </Text>
                        </div>
                      )}
                      {!item.author.publication && (
                        <div className="flex items-center gap-2">
                          <Avatar size="small" src={item.author.avatar} />
                          <Text>{item.author.name}</Text>
                        </div>
                      )}
                    </div>
                    <Title level={5} className="mb-2">
                      {item.title}
                    </Title>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      {item.date === "Apr 17" && <StarOutlined className="text-yellow-400" />}
                      <Text>{item.date}</Text>
                    </div>
                  </List.Item>
                )}
              />
              <Button type="link" className="py-4 block">
                See the full list
              </Button>

              <div className="mt-6">
                <Card className="bg-blue-50 rounded">
                  <Title level={5}>Writing on Medium</Title>
                  <List>
                    <List.Item>
                      <a href="#">New writer FAQ</a>
                    </List.Item>
                    <List.Item>
                      <a href="#">Expert writing advice</a>
                    </List.Item>
                  </List>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  )
}

export default App
