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
        className='h-screen p-4'
        theme='light'>
        <div className="flex justify-end mb-4">
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
            />
        </div>
        {/* Add additional sidebar content here */}
    </Layout.Sider>
  )
}
export default UserSideBar