import { Layout,Menu } from "antd";
import { HomeOutlined,FileTextOutlined,ApartmentOutlined, UserOutlined } from "@ant-design/icons";
import { NavLink } from "react-router";
import { useAuth } from "../../context/auth.context";

const AdminSideBar = ({collapsed}:{collapsed:boolean}) => {
  const {userDetails} = useAuth()
    return(
        <>
         <Layout.Sider trigger={null} collapsible collapsed={collapsed} collapsedWidth={0}>
        <div className="flex flex-col items-center py-6 bg-white border-b border-gray-100">
          <img
            src={userDetails?.image?.optimizedUrl || "https://placehold.co/60x60"}
            alt={userDetails?.name || "User Avatar"}
            className="rounded-full w-16 h-16 border-2 border-teal-500 shadow"
          />
          <p className="mt-3 text-base font-semibold text-gray-800">
            {userDetails?.name || "Guest"}
          </p>
          {userDetails?.email && (
            <span className="text-xs text-gray-400">{userDetails.email}</span>
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