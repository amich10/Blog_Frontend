import React from 'react'
import { Button, Layout } from 'antd'


export const UserSideBar = ({collapsed}:{collapsed:boolean}) => {
  return (
    <Layout.Sider
        trigger={null}
        collapsed={collapsed}
        collapsible
        collapsedWidth={50}
        width={200}
        className='h-screen'
        theme='light'
    >
        <Button
            icon={collapsed ? <Menu}
        >
        
    </Layout.Sider>    
  )
}
export default UserSideBar