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
      style={{
        background: "linear-gradient(135deg, #1e293b 0%, #0ea5e9 100%)",
        minHeight: "100vh",
        boxShadow: "2px 0 8px #0ea5e9",
      }}
    >
      <div className="flex flex-col items-center py-6 border-b border-gray-700 bg-transparent">
        <img
          src={userDetails?.image?.optimizedUrl || "https://placehold.co/60x60"}
          alt={userDetails?.name || "User Avatar"}
          className="rounded-full w-16 h-16 border-2 border-blue-400 shadow"
        />
        <p className="mt-3 text-base font-semibold text-white">
          {userDetails?.name || "Guest"}
        </p>
        {userDetails?.email && (
          <span className="text-xs text-blue-200">{userDetails.email}</span>
        )}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        className="admin-menu"
        style={{
          background: "transparent",
        }}
        items={[
          {
            key: "1",
            icon: <HomeOutlined style={{ color: "#38bdf8" }} />,
            label: <NavLink style={{ color: "#fff" }} to="/admin">Dashboard</NavLink>,
          },
          {
            key: "2",
            icon: <UserOutlined style={{ color: "#38bdf8" }} />,
            label: <NavLink style={{ color: "#fff" }} to="/admin/users">Users</NavLink>,
          },
          {
            key: "3",
            icon: <ApartmentOutlined style={{ color: "#38bdf8" }} />,
            label: <NavLink style={{ color: "#fff" }} to="/admin/category">Category</NavLink>,
          },
          {
            key: "4",
            icon: <FileTextOutlined style={{ color: "#38bdf8" }} />,
            label: <NavLink style={{ color: "#fff" }} to="/admin/products">Posts</NavLink>,
          },
        ]}
      />
    </Sider>
  );
};

export default AdminSideBar;