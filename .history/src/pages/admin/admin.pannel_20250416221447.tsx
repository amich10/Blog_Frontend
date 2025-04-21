import React, { useEffect, useState } from 'react';
import {Layout} from 'antd';
import AdminSideBar from './admin.sidebar';
import AdminHeader from './admin.header';
import AdminContent from './admin.content';
import { useAuth } from '../../context/auth.context';
import { useNavigate } from 'react-router';
import { getLocalStorage } from '../../utilities/helpers';
import { webStorageConstants } from '../../constants/constants';

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {userDetails} = useAuth()
  const navigate = useNavigate()

  useEffect(() =>{ 
    let token = getLocalStorage(webStorageConstants.ACCESS)
    if(!token){
        navigate('/')
    }
  },[us])

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