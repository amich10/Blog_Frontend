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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card
            className="shadow-md rounded-lg border-0 hover:shadow-lg transition-shadow duration-200"
            bodyStyle={{ padding: "24px 20px" }}
          >
            <Statistic
              title={<span className="text-gray-600 font-medium">Total Posts</span>}
              value={1248}
              valueStyle={{ fontSize: 32, fontWeight: 700, color: "#2563eb" }}
              prefix={<EditOutlined className="text-blue-500 mr-2" />}
            />
          </Card>
          <Card
            className="shadow-md rounded-lg border-0 hover:shadow-lg transition-shadow duration-200"
            bodyStyle={{ padding: "24px 20px" }}
          >
            <Statistic
              title={<span className="text-gray-600 font-medium">Total Category</span>}
              value={data.length}
              valueStyle={{ fontSize: 32, fontWeight: 700, color: "#22c55e" }}
              prefix={<TagsOutlined className="text-green-500 mr-2" />}
            />
          </Card>
          <Card
            className="shadow-md rounded-lg border-0 hover:shadow-lg transition-shadow duration-200"
            bodyStyle={{ padding: "24px 20px" }}
          >
            <Statistic
              title={<span className="text-gray-600 font-medium">Users</span>}
              value={users.length}
              valueStyle={{ fontSize: 32, fontWeight: 700, color: "#f59e42" }}
              prefix={<UserOutlined className="text-orange-500 mr-2" />}
            />
          </Card>
        </div>

        {/* Recent Posts and Quick Actions */}
        <div className="grid grid-cols-1 gap-8">
          {/* Quick Actions */}
          <Card
            title={<span className="font-semibold text-lg text-gray-800">Quick Actions</span>}
            className="shadow-lg rounded-xl border-0"
            bodyStyle={{ padding: "28px 24px" }}
            headStyle={{ borderBottom: "none", padding: "20px 24px" }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Button
          style={{ height: "90px", fontSize: 16, fontWeight: 500 }}
          type="dashed"
          icon={<PlusOutlined style={{ fontSize: 24 }} />}
          className="flex flex-col items-center justify-center !border-blue-500 !text-blue-600 hover:!bg-blue-50 transition"
          block
              >
          New Post
              </Button>
              <Button
          style={{ height: "90px", fontSize: 16, fontWeight: 500 }}
          type="dashed"
          icon={<TagsOutlined style={{ fontSize: 24 }} />}
          className="flex flex-col items-center justify-center !border-green-500 !text-green-600 hover:!bg-green-50 transition"
          block
              >
          Add Category
              </Button>
              <Button
          style={{ height: "90px", fontSize: 16, fontWeight: 500 }}
          type="dashed"
          icon={<FileImageOutlined style={{ fontSize: 24 }} />}
          className="flex flex-col items-center justify-center !border-purple-500 !text-purple-600 hover:!bg-purple-50 transition"
          block
              >
          All Posts
              </Button>
              <Button
          style={{ height: "90px", fontSize: 16, fontWeight: 500 }}
          type="dashed"
          icon={<UserAddOutlined style={{ fontSize: 24 }} />}
          className="flex flex-col items-center justify-center !border-orange-500 !text-orange-600 hover:!bg-orange-50 transition"
          block
              >
          Add User
              </Button>
            </div>
          </Card>
        </div>
      </Layout.Content>
    </>
  );
};

export default AdminDashBoard;
