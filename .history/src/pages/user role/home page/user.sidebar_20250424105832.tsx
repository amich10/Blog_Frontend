import React from 'react'
import { Layout } from 'antd'


export const UserSideBar = ({collapsed}:boolean) => {
  return (
    <Layout.Sider
        trigger={null}
        collapsed={collapsed}
    >
        
    </Layout.Sider>    
  )
}
export default UserSideBar