import { Layout, Button, Dropdown } from "antd";
import {
  KeyOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { PiUserListLight } from "react-icons/pi";
import type { MenuProps } from "antd";
import { NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { removeLocalStorage } from "../../utilities/helpers";
import { webStorageConstants } from "../../constants/constants";
import { logout } from "../auth/auth.slice";

export interface ICollapseProps {
  collapsed: boolean;
  setCollapsed: Function;
}

const AdminHeader = ({ collapsed, setCollapsed }: ICollapseProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state: RootState) => state.auth.userDetails);

  const handleLogout = (event: React.MouseEvent) => {
    event.preventDefault();
    removeLocalStorage(webStorageConstants.ACCESS);
    removeLocalStorage(webStorageConstants.REFRESH);
    userDetails
    navigate('/');
  };

  const menuItems: MenuProps["items"] = [
    {
      key: '1',
      label: (
        <NavLink to="/profile">
          <UserOutlined className="mr-1.5" />
          Profile Update
        </NavLink>
      ),
    },
    {
      key: '2',
      label: (
        <NavLink to="/change-password">
          <KeyOutlined className="mr-1.5" />
          Change Password
        </NavLink>
      ),
    },
    {
      key: '3',
      label: (
        <a href="/" onClick={handleLogout}>
          <LogoutOutlined className="mr-1.5" />
          Logout
        </a>
      ),
    },
  ];

  return (
    <Layout.Header className="p-0! bg-white! flex justify-between">
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{ fontSize: "16px", width: 64, height: 64 }}
      />
      <Dropdown menu={{ items: menuItems }} trigger={["click"]} className="mr-8">
        <PiUserListLight className="h-7 w-7 flex mt-5 text-black" />
      </Dropdown>
    </Layout.Header>
  );
};

export default AdminHeader;
