import { Button, Layout, Menu } from 'antd'
import { CaretRightOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined } from '@ant-design/icons'

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
            className='align-self flex-end'
        />

        <Menu 
            theme='light'
            mode='inline'
            defaultSelectedKeys={['1']}
            items={[
                {
                    key:'1',
                    icon:<CaretRightOutlined/>,
                    label:'setting'
                },{
                    key:"2",
                    icon:<LogoutOutlined/>,
                    label:"logout"
                }
            ]}
        />
        
    </Layout.Sider>    
  )
}
export default UserSideBar