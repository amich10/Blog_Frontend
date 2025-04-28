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
import { CSSProperties } from 'react';

const { Sider } = Layout;

export interface ICollapseProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const UserSideBar = ({ collapsed, setCollapsed }: ICollapseProps) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const siderStyle: CSSProperties = {
    overflow: 'auto',
    height: 'calc(100vh - 64px)', // Subtract header height
    position: 'fixed',
    left: 0,
    top: 64, // Start below header
    bottom: 0,
    background: colorBgContainer,
    boxShadow: '2px 0 8px 0 rgba(29, 35, 41, 0.05)',
    zIndex: 9 // Below header but above content
  };

  const menuStyle: CSSProperties = {
    height: '100%',
    borderRight: 0
  };

  const collapseButtonStyle: CSSProperties = {
    width: '100%',
    height: 48,
    borderTop: '1px solid rgba(0, 0, 0, 0.06)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      collapsedWidth={64}
      width={220}
      style={siderStyle}
      className="site-sider"
    >
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%',
        paddingBottom: 48 // Space for collapse button
      }}>
        <Menu 
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          style={menuStyle}
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
        style={collapseButtonStyle}
      />
    </Sider>
  );
};

export default UserSideBar;