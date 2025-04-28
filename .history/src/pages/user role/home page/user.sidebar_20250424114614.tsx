import { Button, Layout, Menu } from 'antd'
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined } from '@ant-design/icons'
import { 
    HomeOutlined,
    ReadOutlined,
    FolderOutlined,
    TagOutlined,
    UserOutlined,
    CalendarOutlined,
    InfoCircleOutlined,
    ContactsOutlined,

    LoginOutlined
} from '@ant-design/icons';

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

<Menu 
    theme='light'
    mode='inline'
    defaultSelectedKeys={['1']}
    items={[
        {
            key: '1',
            icon: <HomeOutlined />,
            label: 'Home'
        },
        {
            key: '2',
            icon: <ReadOutlined />,
            label: 'Articles'
        },
        {
            key: '3',
            icon: <FolderOutlined />,
            label: 'Categories',
            children: [
                {
                    key: '3-1',
                    label: 'Technology'
                },
                {
                    key: '3-2',
                    label: 'Business'
                },
                {
                    key: '3-3',
                    label: 'Lifestyle'
                }
            ]
        },
        {
            key: '4',
            icon: <TagOutlined />,
            label: 'Tags'
        },
        {
            key: '5',
            icon: <UserOutlined />,
            label: 'Authors'
        },
        {
            key: '6',
            icon: <CalendarOutlined />,
            label: 'Archives'
        },
        {
            key: '7',
            icon: <InfoCircleOutlined />,
            label: 'About'
        },
        {
            key: '8',
            icon: <ContactsOutlined />,
            label: 'Contact'
        },
        {
            key: '9',
            icon: <SettingOutlined />,
            label: 'Settings',
            disabled: true // Only show for admin users
        },
        {
            key: '10',
            icon: <LoginOutlined />,
            label: 'Login'
        }
    ]}
/>
        
    </Layout.Sider>    
  )
}
export default UserSideBar