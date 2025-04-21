import React, { useEffect, useState } from 'react';
import {Layout} from 'antd';
import AdminSideBar from './admin.sidebar';
import AdminHeader from './admin.header';
import AdminContent from './admin.content';
import { useAuth } from '../../context/auth.context';


const AdminPannelPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {userDetails}= useAuth()
  useEffect(() =>{
    
  })
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

export default AdminPannelPage;