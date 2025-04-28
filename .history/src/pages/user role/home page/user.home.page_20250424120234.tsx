import { Layout } from "antd"
import { useState } from "react"
import AdminSideBar from "../../admin/admin.sidebar"
import UserSideBar from "./user.sidebar"
import UserHeader from "./user.header"

const{Header,Sider,Content} = Layout


const UserHomePage = () => {
    const [collapsed,setCollapsed] = useState<boolean>(false)
  return (
    <Layout>
        <UserSideBar collapsed={collapsed} setCollapsed={setCollapsed}/>
        <Layout>
            <UserHeader
            <Content></Content>
        </Layout>
    </Layout>    
  )
}

export default UserHomePage