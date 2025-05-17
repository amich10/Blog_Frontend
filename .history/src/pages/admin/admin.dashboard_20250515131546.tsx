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
import { useUsers } from "../../context/user.context";
import { useCategory } from "../../context/category.context";
const { Title, Text } = Typography;

const AdminDashBoard = () => {
    const {users} = useUsers()
    const {data} = useCategory()

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
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
              title="Total Category"
              value={data.length}
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
              title="Users"
              value={users.length}
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
                   {/* Quick Actions and Recent Comments */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card title="Quick Actions" className="shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="dashed"
                  icon={<PlusOutlined />}
                >
                  New Post
                </Button>
                <Button
                  type="dashed"
                  icon={<TagsOutlined />}
                >
                  Add Category
                </Button>
                <Button
                  type="dashed"
                  icon={<FileImageOutlined />}
                >
                  Media Library
                </Button>
                <Button
                  type="dashed"
                  icon={<UserAddOutlined />}
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
