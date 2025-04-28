import { Layout } from 'antd';
import React from 'react'


export interface ICollapseProps {
    collapsed: boolean;
    setCollapsed: Function;
  }
const UserHeader = ({collapsed,setCollapsed}:ICollapseProps) => {

  return (
    <>
    <Layout.Header>
        <Butt
    </Layout.Header>
    </>
  )
}
export default UserHeader;
