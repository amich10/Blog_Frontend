import { Button, Layout, Menu, theme } from 'antd';
import { 
  LogoutOutlined, 
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
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    background: colorBgContainer,
    boxShadow: '2px 0 8px 0 rgba(29, 35, 41, 0.05)'
  };

  const menuStyle: CSSProperties = {
    height: 'calc(100% - 48px)',
    borderRight: 0
  };

  const collapseButtonStyle: CSSProperties = {
    width: '100%',
    height: 48,
    borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ flex: 1, overflow: 'auto' }}>
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
              }
            ]}
          />
        </div>
        
        <div style={{ borderTop: '1px solid rgba(0, 0, 0, 0.06)' }}>
          <Menu
            theme="light"
            mode="inline"
            items={[
              {
                key: '10',
                icon: collapsed ? <LoginOutlined /> : null,
                label: collapsed ? '' : 'Login'
              }
            ]}
          />
          
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={collapseButtonStyle}
          />
        </div>
      </div>
    </Sider>
  );
};

export default UserSideBar;