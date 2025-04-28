import { Layout } from "antd"
import { useState } from "react"
import AdminSideBar from "../../admin/admin.sidebar"
import UserHeader from "./user.header"
import { Outlet } from "react-router"


const UserHomePage = () => {
    const [collapsed,setCollapsed] = useState<boolean>(false)
  return (
    <Layout>
        <Layout>
            <UserHeader/>
           <Outlet/>
        </Layout>
    </Layout>    
  )
}

export default UserHomePage