import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  FileTextOutlined,
  ApartmentOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router";
import { useAuth } from "../../context/auth.context";

const { Sider } = Layout;

const AdminSideBar = ({ collapsed }: { collapsed: boolean }) => {
  const { userDetails } = useAuth();

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      collapsedWidth={0}
      className="admin-sidebar"
      width={240}
      style={{ background: "#fff", minHeight: "100vh", boxShadow: "2px 0 8px #f0f1f2" }}
    >
      <div className="flex flex-col items-center py-6 border-b border-gray-100 bg-white">
        <img
          src={userDetails?.image?.optimizedUrl || "https://placehold.co/60x60"}
          alt={userDetails?.name || "User Avatar"}
          className="rounded-full w-16 h-16 border-2 border-blue-500 shadow"
        />
        <p className="mt-3 text-base font-semibold text-gray-700">
          {userDetails?.name || "Guest"}
        </p>
        {userDetails?.email && (
          <span className="text-xs text-gray-500">{userDetails.email}</span>
        )}
      </div>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["1"]}
        className="admin-menu"
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
            icon: <ApartmentOutlined />,
            label: <NavLink to="/admin/category">Category</NavLink>,
          },
          {
            key: "4",
            icon: <FileTextOutlined />,
            label: <NavLink to="/admin/products">Posts</NavLink>,
          },
        ]}
      />
    </Sider>
  );
};

export default AdminSideBar;