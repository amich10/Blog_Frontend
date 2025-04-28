import { Button, Layout, Menu, theme } from 'antd';
import { 
    MenuFoldOutlined, 
    MenuUnfoldOutlined, 
    SettingOutlined,
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

const { Sider } = Layout;

export interface ICollapseProps {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}

export const UserSideBar = ({ collapsed, setCollapsed }: ICollapseProps) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            collapsedWidth={64}
            width={220}
            style={{ background: colorBgContainer }}
            className="site-sider fixed top-16 left-0 bottom-0 z-10 shadow-md"
        >
            <div className="flex flex-col h-full pb-12">
                <Menu 
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    className="h-full border-r-0"
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
                                { key: '3-1', label: 'Technology' },
                                { key: '3-2', label: 'Business' },
                                { key: '3-3', label: 'Lifestyle' }
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
                            disabled: true
                        },
                        {
                            key: '10',
                            icon: <LoginOutlined />,
                            label: 'Login'
                        }
                    ]}
                />
            </div>
            
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                className="w-full h-12 border-t border-gray-200 flex items-center justify-center absolute bottom-0 left-0"
            />
        </Sider>
    );
};

export default UserSideBar;
