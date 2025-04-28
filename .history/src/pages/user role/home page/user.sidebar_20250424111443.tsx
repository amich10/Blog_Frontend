import React from 'react'
import { Button, Layout } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

export interface ICollapseProps {
    collapsed: boolean;
    setCollapsed: Function;
  }
export const UserSideBar = ({collapsed,setCollapsed}:ICollapseProps) => {
  return (
    <Layout.Sider
        trigger={null}
        collapsed={collapsed}
        collapsible
        collapsedWidth={50}
        width={200}
        className='h-screen'
        theme='light'>
        <Button
            icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
            onClick={() => setCollapsed(!collapsed)}
        />
        
    </Layout.Sider>    
  )
}
export default UserSideBar