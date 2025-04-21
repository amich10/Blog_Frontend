import { Layout, Button,Dropdown } from "antd";
import { KeyOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";
import { PiUserListLight } from "react-icons/pi";
import type { MenuProps } from "antd";
import { NavLink, useNavigate } from "react-router";
import { removeLocalStorage } from "../../utilities/helpers";
import { webStorageConstants } from "../../constants/constants";
import { useAuth } from "../../context/auth.context";


export interface ICollapseProps {
  collapsed: boolean;
  setCollapsed: Function;
}
const AdminHeader = ({ collapsed, setCollapsed }: ICollapseProps) => {
    const navigate = useNavigate()
    const {setLoggedInUser} = useAuth()
    const menuItems: MenuProps["items"] = [
        {
          key: 1,
          label: (
            <NavLink to="/profile">
              <UserOutlined className="mr-1.5" />
              Profile Update
            </NavLink>
          ),
        },
        {
          key: 2,
          label: (
            <NavLink to="/change-password">
              <KeyOutlined className="mr-1.5" />
              Change Password
            </NavLink>
          ),
        },
        {
          key: 3,
          label: (
            <NavLink
              to="/"
              onClick={(event) => {
                event.preventDefault();
                removeLocalStorage(webStorageConstants.ACCESS);
                removeLocalStorage(webStorageConstants.REFRESH);
                navigate("/");
              }}
            >
              <LogoutOutlined className="mr-1.5" />
              Logout
            </NavLink>
          ),
        },
      ];
  return (
    <>
      <Layout.Header className=" p-0! bg-white! flex justify-between">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <Dropdown
          menu={{ items: menuItems }}
          trigger={["click"]}
          className="mr-8"
        >
            <PiUserListLight className="h-7 w-7 flex mt-5 text-black" />
        </Dropdown>
      </Layout.Header>
    </>
  );
};
export default AdminHeader;
