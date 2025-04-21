import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import AdminSideBar from './admin.sidebar';
import AdminHeader from './admin.header';
import AdminContent from './admin.content';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const AdminPannelPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // ✅ Get user details from Redux
  const userDetails = useSelector((state: RootState) => state.auth.userDetails);

  useEffect(() => {
    if (!userDetails) {
      navigate('/');
    }
  }, [userDetails, navigate]); // Make sure to include dependencies

  return (
    <Layout>
      <AdminSideBar collapsed={collapsed} />
      <Layout>
        <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <AdminContent />
      </Layout>
    </Layout>
  );
};

export default AdminPannelPage;
