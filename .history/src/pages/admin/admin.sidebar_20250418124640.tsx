import { Layout,Menu } from "antd";
import { HomeOutlined,FileTextOutlined,ApartmentOutlined, UserOutlined } from "@ant-design/icons";
import { NavLink } from "react-router";
import { useAuth } from "../../context/auth.context";

const AdminSideBar = ({collapsed}:{collapsed:boolean}) => {
  const {userDetails} = useAuth()
    return(
        <>
         <Layout.Sider trigger={null} collapsible collapsed={collapsed} collapsedWidth={0}>
         <div className="demo-logo-vertical bg-white text-white flex flex-col justify-center items-center p-3 gap-3 ">
        {userDetails ? (
            <>
              <img
                src={userDetails.image?.optimizedUrl || "https://placehold.co/60x60"}
                alt="User Image"
                className="rounded-full w-15 h-15 border-2 border-teal-500"
              />
              <p className="text-green-700 font-semibold">{userDetails.name}</p>
            </>
          ) : (
            <>
              <img
                src="https://placehold.co/60x60"
                alt="Default Avatar"
                className="rounded-full w-15 h-15 border-2 border-teal-500"
              />
              <p>Guest</p>
            </>
          )}
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