import {
  ArrowUpOutlined,
  CommentOutlined,
  EditOutlined,
  EyeOutlined,
  FileImageOutlined,
  MoreOutlined,
  PlusOutlined,
  TagsOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Layout,
  List,
  Statistic,
  Typography,
} from "antd";
const { Title, Text } = Typography;

const AdminDashBoard = () => {
  return (
    <>
      <Layout.Content className="p-4 bg-white min-h-screen">
        <div className="border-b pb-4 mb-6">
          <Title
            level={2}
            className="!mb-0 !text-2xl font-semibold text-gray-800"
          >
            Dashboard
          </Title>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="shadow-sm">
            <Statistic
              title="Total Posts"
              value={1248}
              prefix={<EditOutlined className="text-blue-500" />}
              suffix={
                <Text className="text-green-500 text-sm">
                  <ArrowUpOutlined /> 12.5%
                </Text>
              }
            />
            <Text className="text-gray-500 text-xs">from last month</Text>
          </Card>
          <Card className="shadow-sm">
            <Statistic
              title="Total Views"
              value={84593}
              prefix={<EyeOutlined className="text-green-500" />}
              suffix={
                <Text className="text-green-500 text-sm">
                  <ArrowUpOutlined /> 8.3%
                </Text>
              }
            />
            <Text className="text-gray-500 text-xs">from last month</Text>
          </Card>
          <Card className="shadow-sm">
            <Statistic
              title="Comments"
              value={1024}
              prefix={<CommentOutlined className="text-purple-500" />}
              suffix={
                <Text className="text-green-500 text-sm">
                  <ArrowUpOutlined /> 5.7%
                </Text>
              }
            />
            <Text className="text-gray-500 text-xs">from last month</Text>
          </Card>
          <Card className="shadow-sm">
            <Statistic
              title="Users"
              value={3287}
              prefix={<UserOutlined className="text-orange-500" />}
              suffix={
                <Text className="text-green-500 text-sm">
                  <ArrowUpOutlined /> 4.2%
                </Text>
              }
            />
            <Text className="text-gray-500 text-xs">from last month</Text>
          </Card>
        </div>

        {/* Recent Posts and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Posts */}
          <div className="lg:col-span-2">
            <Card
              title="Recent Posts"
              className="shadow-sm"
              extra={<a className="text-blue-500">View all posts</a>}
            >
              <List
                itemLayout="horizontal"
                dataSource={[
                  {
                    title: "How to Build a Blog with Next.js",
                    date: "May 12, 2023",
                    views: "1,245 views",
                    comments: "24 comments",
                  },
                  {
                    title: "Tailwind CSS Tips and Tricks",
                    date: "May 10, 2023",
                    views: "2,187 views",
                    comments: "42 comments",
                  },
                  {
                    title: "React Hooks Explained",
                    date: "May 8, 2023",
                    views: "3,542 views",
                    comments: "56 comments",
                  },
                ]}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Button key="edit" type="text" icon={<EditOutlined />} />,
                      <Button key="more" type="text" icon={<MoreOutlined />} />,
                    ]}
                  >
                    <List.Item.Meta
                      title={<a className="text-gray-800">{item.title}</a>}
                      description={`Published on ${item.date}`}
                    />
                    <div>
                      <Text className="text-gray-500 mr-4">{item.views}</Text>
                      <Text className="text-gray-500">{item.comments}</Text>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </div>

          {/* Quick Actions and Recent Comments */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card title="Quick Actions" className="shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="dashed"
                  icon={<PlusOutlined />}
                  className="h-24! flex! flex-co! items-center! justify-center!"
                >
                  New Post
                </Button>
                <Button
                  type="dashed"
                  icon={<TagsOutlined />}
                  className="h-24! flex! flex-col! items-center! justify-center!"
                >
                  Add Category
                </Button>
                <Button
                  type="dashed"
                  icon={<FileImageOutlined />}
                  className="h-24! flex! flex-col! items-center! justify-center!"
                >
                  Media Library
                </Button>
                <Button
                  type="dashed"
                  icon={<UserAddOutlined />}
                  className="h-24! flex! flex-col! items-center! justify-center"
                >
                  Add User
                </Button>
              </div>
            </Card>

            {/* Recent Comments */}
            <Card
              title="Recent Comments"
              className="shadow-sm mt-2!"
              extra={<a className="text-blue-500">View all comments</a>}
            >
              <List
                dataSource={[
                  {
                    name: "John Doe",
                    comment: "Great article! Very helpful tips.",
                    post: 'On "Tailwind CSS Tips and Tricks"',
                  },
                  {
                    name: "Jane Smith",
                    comment: "Could you expand on the hooks section?",
                    post: 'On "React Hooks Explained"',
                  },
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src="https://via.placeholder.com/150" />}
                      title={item.name}
                      description={
                        <>
                          <div>{item.comment}</div>
                          <Text className="text-gray-500 text-xs">
                            {item.post}
                          </Text>
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </div>
        </div>
      </Layout.Content>
    </>
  );
};

export default AdminDashBoard;
