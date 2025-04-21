import { Layout,Menu } from "antd";
import { HomeOutlined,FileTextOutlined,ApartmentOutlined, UserOutlined } from "@ant-design/icons";
import { NavLink } from "react-router";
import { useAuth } from "../../context/auth.context";

const AdminSideBar = ({collapsed}:{collapsed:boolean}) => {

  const {userDetails} = useAuth()
    return(
        <>
         <Layout.Sider trigger={null} collapsible collapsed={collapsed} collapsedWidth={0} width={250}>
          <div className="bg-white flex flex-col justify-center items-center">
           <div>
           {userDetails ? <><img src={userDetails.image.optimizedUrl} alt="user_image"  className="h-15 w-15 rounded-full"/></>:<></>}
           </div>
           <div>
           {userDetails ? userDetails.username:<></>}
           </div>
            
          </div>
        <Menu
          theme="light"
          mode="inline"
          className='h-screen'
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <HomeOutlined />,
              label: <NavLink to="/admin">Dashboard</NavLink>
            },
            {
              key: '2',
              icon: <UserOutlined />,
              label: <NavLink to="/admin/users">Users</NavLink>
            },
              {
                key: '3',
                icon: <ApartmentOutlined />,
                label: <NavLink to="/admin/category">Category</NavLink>
              },
              {
                key: '4',
                icon: <FileTextOutlined />,
                label: <NavLink to="/admin/products">Posts</NavLink>
              },

          ]}
        />
      </Layout.Sider>
        </>
    )
}
export default AdminSideBar;