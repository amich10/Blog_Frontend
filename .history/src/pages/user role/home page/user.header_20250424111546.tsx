import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout } from 'antd';
import React from 'react'


export interface ICollapseProps {
    collapsed: boolean;
    setCollapsed: Function;
  }
const UserHeader = () => {

  return (
    <>
    <Layout.Header>
    </Layout.Header>
    </>
  )
}
export default UserHeader;
