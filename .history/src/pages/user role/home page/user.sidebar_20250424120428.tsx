import { Layout, Menu, theme } from "antd";
import {
  HomeOutlined,
  FileTextOutlined,
  ApartmentOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router";

const { Sider } = Layout;

const menuItems = [
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
    label: <NavLink to="/admin/posts">Posts</NavLink>,
  },
];

const AdminSideBar = ({ collapsed }: { collapsed: boolean }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      collapsedWidth={0}
      width={250}
      style={{ minHeight: "100vh", background: colorBgContainer }}
    >
      <div className="flex flex-col items-center py-6 border-b border-gray-200">
        <img
          src={
            userDetails?.image?.optimizedUrl ||
            "https://placehold.co/60x60"
          }
          alt="User"
          className="rounded-full w-16 h-16 border-2 border-teal-500 object-cover mb-2"
        />
        <p className="font-semibold">
          {userDetails?.username || "Guest"}
        </p>
        <p className="text-xs text-gray-500">
          {userDetails?.email || ""}
        </p>
      </div>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={menuItems}
      />
    </Sider>
  );
};

export default AdminSideBar;
