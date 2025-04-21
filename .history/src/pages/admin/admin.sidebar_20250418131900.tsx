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

const menuConfig = [
  {
    key: "1",
    icon: <HomeOutlined />,
    to: "/admin",
    label: "Dashboard",
  },
  {
    key: "2",
    icon: <UserOutlined />,
    to: "/admin/users",
    label: "Users",
  },
  {
    key: "3",
    icon: <ApartmentOutlined />,
    to: "/admin/category",
    label: "Category",
  },
  {
    key: "4",
    icon: <FileTextOutlined />,
    to: "/admin/products",
    label: "Posts",
  },
];

const AdminSideBar = ({ collapsed }: { collapsed: boolean }) => {
  const { userDetails } = useAuth();

  const menuItems = menuConfig.map((item) => ({
    key: item.key,
    icon: item.icon,
    label: <NavLink to={item.to}>{item.label}</NavLink>,
  }));

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      collapsedWidth={0}
      width={250}
      className="h-screen"
    >
      <div className="bg-white flex flex-col justify-center items-center p-4">
        {userDetails && (
          <>
            {userDetails.image?.optimizedUrl && (
              <img
                src={userDetails.image.optimizedUrl}
                alt="user"
                className="h-16 w-16 rounded-full object-cover"
              />
            )}
            <div className="mt-3 font-semibold">{userDetails.username}</div>
            <div className="text-xs text-gray-500">{userDetails.email}</div>
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