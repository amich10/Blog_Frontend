import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import AdminSideBar from './admin.sidebar';
import AdminHeader from './admin.header';
import AdminContent from './admin.content';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const AdminPannelPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const { userDetails, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!loading && !userDetails) {
      navigate('/');
    }
  }, [userDetails, loading, navigate]);

  if (loading) return <div>Loading...</div>;
  


  useEffect(() => {
    if (!loading && !userDetails) {
      navigate('/');
    }
  }, [userDetails, loading, navigate]);
  

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
