import { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import AdminHeader from './admin.header';
import AdminSideBar from './admin.sidebar';

const { Header, Sider, Content } = Layout;

const AdminPannelPage = () =>{
    const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className='h-screen'>
     <AdminSideBar collapsed={collapsed} setCollapsed={setCollapsed}/>
      <Layout>
       <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed}/>
        <Content
          className='bg-violet-200 m-2 p-2'
        >
          <div className='text-center' >
          Content
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
export default AdminPannelPage

