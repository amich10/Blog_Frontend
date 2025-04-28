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
        className='h-screen'
        theme='light'
    >
        
    </Layout.Sider>    
  )
}
export default UserSideBar