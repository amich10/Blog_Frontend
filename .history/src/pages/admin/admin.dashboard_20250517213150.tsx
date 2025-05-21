import {
  ArrowUpOutlined,
  CommentOutlined,
  EditOutlined,
  EyeOutlined,
  FileImageOutlined,
  LoadingOutlined,
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
  Spin,
  Statistic,
  Typography,
} from "antd";
import { useUsers } from "../../context/user.context";
import { useCategory } from "../../context/category.context";
import { useNavigate } from "react-router";
import { usePost } from "../../context/post.context";
import { useState } from "react";
const { Title, Text } = Typography;

const AdminDashBoard = () => {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)
  const { users } = useUsers();
  const { data } = useCategory();
  const {posts,setPosts} = usePost()

  return (
    <>{loading ? ( <Spin tip="Loading ..."  fullscreen indicator={<LoadingOutlined/>}/>) : 
    (<Layout.Content className="p-4 bg-white min-h-screen">
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
              title={
                <span className="text-gray-600 font-medium">Total Posts</span>
              }
              value={posts.length}
              valueStyle={{ fontSize: 32, fontWeight: 500, color: "black" }}
              prefix={<EditOutlined className="text-blue-500 mr-2" />}
            />
          </Card>
          <Card
            className="shadow-md rounded-lg border-0 hover:shadow-lg transition-shadow duration-200"
            bodyStyle={{ padding: "24px 20px" }}
          >
            <Statistic
              title={
                <span className="text-gray-600 font-medium">
                  Total Category
                </span>
              }
              value={data.length}
              valueStyle={{ fontSize: 32, fontWeight: 500, color: "black" }}
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
              valueStyle={{ fontSize: 32, fontWeight: 500, color: "black" }}
              prefix={<UserOutlined className="text-orange-500 mr-2" />}
            />
          </Card>
        </div>

        {/* Recent Posts and Quick Actions */}
        <div className="grid grid-cols-1 gap-6">
          {/* Quick Actions and Recent Comments */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card title="Quick Actions" className="shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  style={{ height: "80px" }}
                  type="dashed"
                  onClick={() => navigate("/admin/posts/create")}
                  icon={<PlusOutlined />}
                >
                  New Post
                </Button>
                <Button
                  style={{ height: "80px" }}
                  type="dashed"
                  onClick={() => navigate("/admin/category/create")}
                  icon={<TagsOutlined />}
                >
                  Add Category
                </Button>
                <Button
                  style={{ height: "80px" }}
                  onClick={() => navigate("/admin/posts")}
                  type="dashed"
                  icon={<FileImageOutlined />}
                >
                  All Posts
                </Button>
                <Button
                  style={{ height: "80px" }}
                  onClick={() => navigate("/admin/users/create")}
                  type="dashed"
                  icon={<UserAddOutlined />}
                >
                  Add User
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </Layout.Content>)
    }
    </>
  );
};

export default AdminDashBoard;
