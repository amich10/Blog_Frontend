import React, { useState } from 'react';
import {Layout} from 'antd';
import AdminSideBar from './admin.sidebar';
import AdminHeader from './admin.header';
import AdminContent from './admin.content';


const AdminLa: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <AdminSideBar collapsed={collapsed}/>
      <Layout>
      <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed}/>
      <AdminContent/>
      </Layout>
    </Layout>
  );
};

export default App;