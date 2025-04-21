import { Layout } from "antd";
import {HomeOutlined,
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
    icon: <HomeOutlined className="text-sky-400" />,
    label: "Dashboard",
    to: "/admin",
  },
  {
    key: "2",
    icon: <UserOutlined className="text-sky-400" />,
    label: "Users",
    to: "/admin/users",
  },
  {
    key: "3",
    icon: <ApartmentOutlined className="text-sky-400" />,
    label: "Category",
    to: "/admin/category",
  },
  {
    key: "4",
    icon: <FileTextOutlined className="text-sky-400" />,
    label: "Posts",
    to: "/admin/products",
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
      width={240}
      className="!bg-gradient-to-br !from-slate-800 !to-sky-500 min-h-screen shadow-lg"
      style={{ boxShadow: "2px 0 8px #0ea5e9" }}
    >
      <div className="flex flex-col items-center py-6 border-b border-slate-700 bg-transparent">
        <img
          src={userDetails?.image?.optimizedUrl || "https://placehold.co/60x60"}
          alt={userDetails?.name || "User Avatar"}
          className="rounded-full w-16 h-16 border-2 border-sky-400 shadow"
        />
        <p className="mt-3 text-base font-semibold text-white">
          {userDetails?.name || "Guest"}
        </p>
        {userDetails?.email && (
          <span className="text-xs text-sky-200">{userDetails.email}</span>
        )}
      </div>
      <nav className="flex flex-col gap-1 mt-4 px-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.key}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded transition-colors ${
                isActive
                  ? "bg-sky-600 text-white"
                  : "text-white hover:bg-sky-700/60"
              }`
            }
            end
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </Sider>
  );
};

export default AdminSideBar;