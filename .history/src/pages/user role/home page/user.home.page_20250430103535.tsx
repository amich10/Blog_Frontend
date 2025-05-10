import { Layout } from "antd";
import { useState } from "react";
import AdminSideBar from "../../admin/admin.sidebar";
import UserHeader from "./user.header";
import { Outlet } from "react-router-dom"; // Use this, not 'react-router'

const { Header, Sider, Content } = Layout;

const UserHomePage = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <AdminSideBar />
      </Sider>

      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}>
          <UserHeader />
        </Header>

        <Content style={{ margin: "24px 16px", padding: 24, background: "#fff" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserHomePage;
