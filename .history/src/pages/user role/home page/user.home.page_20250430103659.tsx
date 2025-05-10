import { Layout } from "antd";
import { useState } from "react";
import AdminSideBar from "../../admin/admin.sidebar";
import UserHeader from "./user.header";
import { Outlet } from "react-router"; // Use this, not 'react-router'

const { Header, Sider, Content } = Layout;

const UserHomePage = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <Layout >
        <Header>
          <UserHeader />
        </Header>

        <Content>
          <Outlet />
        </Content>
    </Layout>
  );
};

export default UserHomePage;
