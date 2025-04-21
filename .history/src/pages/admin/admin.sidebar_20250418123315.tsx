import { Layout,Menu } from "antd";
const AdminSideBar = ({collapsed}:{collapsed:boolean}) => {
    return(
        <>
         <Layout.Sider trigger={null} collapsible collapsed={collapsed} collapsedWidth={0}>
        <Menu
          theme="light"
          mode="inline"
          className='h-screen'
        />
      </Layout.Sider>
        </>
    )
}
export default AdminSideBar;