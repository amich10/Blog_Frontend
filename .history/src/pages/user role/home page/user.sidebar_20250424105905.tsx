import React from 'react'
import { Layout } from 'antd'


export const UserSideBar = ({collapsed}:{collapsed:boolean}) => {
  return (
    <Layout.Sider
        trigger={null}
        collapsed={collapsed}
        collapsible
    >
        
    </Layout.Sider>    
  )
}
export default UserSideBar