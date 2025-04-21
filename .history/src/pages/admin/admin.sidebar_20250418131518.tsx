import { Layout, Menu } from "antd";
import { HomeOutlined, FileTextOutlined, UserOutlined } from "@ant-design/icons";
import { NavLink } from "react-router";
import { useAuth } from "../../context/auth.context";

const AdminSideBar = ({ collapsed }: { collapsed: boolean }) => {
  const { userDetails } = useAuth();

  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={220}
      className="bg-white"
    >
      <div className="flex flex-col items-center py-6 border-b">
        {userDetails?.image?.optimizedUrl && (
          <img
            src={userDetails.image.optimizedUrl}
            alt="User"
            className="h-14 w-14 rounded-full object-cover"
          />
        )}
        <div className="mt-2 font-semibold">{userDetails?.username}</div>
        <div className="text-xs text-gray-500">{userDetails?.email}</div>
      </div>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "1",
            icon: <HomeOutlined />,
            label: <NavLink to="/admin">Dashboard</NavLink>,
          },
          {
            key: "2",
            icon: <UserOutlined />,
            label: <NavLink to="/admin/users">Users</NavLink>,
          },
          {
            key: "3",
            icon: <FileTextOutlined />,
            label: <NavLink to="/admin/posts">Posts</NavLink>,
          },
        ]}
      />
    </Layout.Sider>
  );
};

export default AdminSideBar;
