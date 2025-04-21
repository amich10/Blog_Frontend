import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import AdminSideBar from './admin.sidebar';
import AdminHeader from './admin.header';

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <AdminSideBar collapsed={collapsed}/>
      <Layout>
      <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed}/>
      <Admin
      </Layout>
    </Layout>
  );
};

export default App;