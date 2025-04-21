import React, { useEffect, useState } from 'react';
import {Layout} from 'antd';
import AdminSideBar from './admin.sidebar';
import AdminHeader from './admin.header';
import AdminContent from './admin.content';
import { useAuth } from '../../context/auth.context';
import { useNavigate } from 'react-router';


const AdminPannelPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {userDetails}= useAuth()
  const navigate=useNavigate()
  useEffect(() =>{
    if(!userDetails){
      navigate('/')
    }
  },[])
  return (
    <Layout>
      <AdminSideBar collapsed={collapsed}/>
      <Layout>
      <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed} out/>
      <AdminContent/>
      </Layout>
    </Layout>
  );
};

export default AdminPannelPage;