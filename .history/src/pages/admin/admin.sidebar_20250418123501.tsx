import { Layout,Menu } from "antd";
import {HomeOulin}
const AdminSideBar = ({collapsed}:{collapsed:boolean}) => {
    return(
        <>
         <Layout.Sider trigger={null} collapsible collapsed={collapsed} collapsedWidth={0}>
        <Menu
          theme="light"
          mode="inline"
          className='h-screen'
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <Home />,
              label: <NavLink to="/admin">Dashboard</NavLink>
            },
            {
                key: '2',
                icon: <FileImageOutlined/>,
                label: <NavLink to="/admin/banner">Banner</NavLink>
              },
              {
                key: '3',
                icon: <BoldOutlined/>,
                label: <NavLink to="/admin/brand">Brand</NavLink>
              },
              {
                key: '4',
                icon: <ApartmentOutlined />,
                label: <NavLink to="/admin/category">Category</NavLink>
              },
              {
                key: '5',
                icon: <UserOutlined />,
                label: <NavLink to="/admin/users">Users</NavLink>
              },
              {
                key: '6',
                icon: <ShopOutlined />,
                label: <NavLink to="/admin/products">Products</NavLink>
              },
              {
                key: '7',
                icon: <ShoppingCartOutlined />,
                label: <NavLink to="/admin/orders">Orders</NavLink>
              },    
              {
                key: '8',
                icon: <DollarCircleOutlined />,
                label: <NavLink to="/admin/transactions">Transactions</NavLink>
              },
              {
                key: '9',
                icon: <MessageOutlined />,
                label: <NavLink to="/admin/messages">Messages</NavLink>
              },  

          ]}
        />
      </Layout.Sider>
        </>
    )
}
export default AdminSideBar;