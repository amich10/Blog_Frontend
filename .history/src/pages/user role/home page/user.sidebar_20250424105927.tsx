import React from 'react'
import { Layout } from 'antd'


export const UserSideBar = ({collapsed}:{collapsed:boolean}) => {
  return (
    <Layout.Sider
        trigger={null}
        collapsed={collapsed}
        collapsible
        collapsedWidth={10}
        width={200}
        s
    >
        
    </Layout.Sider>    
  )
}
export default UserSideBar