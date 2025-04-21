import { Layout, Menu, Avatar, Typography } from "antd";
import { HomeOutlined, FileTextOutlined, ApartmentOutlined, UserOutlined } from "@ant-design/icons";
import { NavLink } from "react-router";
import { useAuth } from "../../context/auth.context";

const { Sider } = Layout;
const { Text } = Typography;

const AdminSideBar = ({ collapsed }: { collapsed: boolean }) => {
  const { userDetails } = useAuth();

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} collapsedWidth={0} width={250}>
      <div className="bg-white flex flex-col items-center py-6">
        {userDetails && (
          <>
            <Avatar
              src={userDetails.image.optimizedUrl}
              size={64}
              alt="User"
              className="mb-3"
            />
            <Text strong>{userDetails.username}</Text>
            <Text type="secondary" className="text-xs">{userDetails.email}</Text>
          </>
        )}
      </div>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={[
          {
            key: '1',
            icon: <HomeOutlined />,
            label: <NavLink to="/admin">Dashboard</NavLink>,
          },
          {
            key: '2',
            icon: <UserOutlined />,
            label: <NavLink to="/admin/users">Users</NavLink>,
          },
          {
            key: '3',
            icon: <ApartmentOutlined />,
            label: <NavLink to="/admin/category">Category</NavLink>,
          },
          {
            key: '4',
            icon: <FileTextOutlined />,
            label: <NavLink to="/admin/products">Posts</NavLink>,
          },
        ]}
      />
    </Sider>
  );
};

export default AdminSideBar;