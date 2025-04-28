import { Button, Layout } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

export interface ICollapseProps {
    collapsed: boolean;
    setCollapsed: (value: boolean) => void;
  }
export const UserSideBar = ({collapsed,setCollapsed}:ICollapseProps) => {
  return (
    <Layout.Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={50}
        width={200}
        className="h-screen"
        theme="light"
    >
        <div className="flex flex-col justify-between h-full">
            {/* Sidebar Content */}
            <div className="p-4">
                {/* Add menu items or other content here */}
                <p className="text-center">Sidebar Content</p>
            </div>
            {/* Collapse Button */}
            <div className="m-2 p-3">
                <Button
                    type="primary"
                    shape="circle"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                />
            </div>
        </div>
    </Layout.Sider>
  )
}
export default UserSideBar