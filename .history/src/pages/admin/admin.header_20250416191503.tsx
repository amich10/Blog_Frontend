import { Layout, Button,Dropdown } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

export interface ICollapseProps {
  collapsed: boolean;
  setCollapsed: Function;
}
const AdminHeader = ({ collapsed, setCollapsed }: ICollapseProps) => {
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
