import { Layout,Menu } from "antd";
import {UploadOutlined,UserOutlined,VideoCameraOutlined,} from '@ant-design/icons';
import { ICollapseProps } from "./admin.header";

const AdminSideBar = ({collapsed}:ICollapseProps) => {
    return(
        <>
         <Layout.Sider trigger={null} collapsible collapsed={collapsed} >
        <Menu
          theme="light"
          mode="inline"
          className='h-screen'
          defaultSelectedKeys={['1']}
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