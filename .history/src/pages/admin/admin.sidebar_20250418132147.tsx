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
    label: <NavLink to="/admin/products">Posts</NavLink>,
  },
];

const AdminSideBar = ({ collapsed }: { collapsed: boolean }) => {
  const { userDetails } = useAuth();

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      collapsedWidth={0}
      width={250}
      className="min-h-screen"
    >
      <div className="bg-white flex flex-col justify-center items-center p-4">
      {userDetails ? (
            <>
              <img
                src={userDetails.image?.optimizedUrl || "https://placehold.co/60x60"}
                alt="User Image"
                className="rounded-full w-15 h-15 border-2 border-teal-500"
              />
              <p>{userDetails.username}</p>
              <p>{userDetails.}</p>
            </>
          ) : (
            <>
              <img
                src="https://placehold.co/60x60"
                alt="Default Avatar"
                className="rounded-full w-15 h-15 border-2 border-teal-500"
              />
              <p>Guest</p>
            </>
          )}
      </div>
      <Menu
        theme="light"
        mode="inline"
        className="h-full"
        defaultSelectedKeys={["1"]}
        items={menuItems}
      />
    </Sider>
  );
};

export default AdminSideBar;