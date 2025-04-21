import { Layout,Menu } from "antd";
import {UploadOutlined,UserOutlined,VideoCameraOutlined,} from '@ant-design/icons';

const AdminSideBar = ({collapsed}:{collapsed:boolean}) => {
    return(
        <>
         <Layout.Sider trigger={null} collapsible collapsed={collapsed} collapsedWidth={0}>
        <Menu
          theme="light"
          mode="inline"
          className='h-screen'
          
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Layout.Sider>
        </>
    )
}
export default AdminSideBar;