import { Layout } from "antd"
import { useState } from "react"
import AdminSideBar from "../../admin/admin.sidebar"
import UserSideBar from "./user.sidebar"
import UserHeader from "./user.header"

const{Header,Sider,Content} = Layout


const UserHomePage = () => {
    const [collasped,setCollapsed] = useState<boolean>(false)
  return (
    <Layout>
        <UserSideBar collapsed={collasped}/>
        <Layout>
            <UserHeader collpased={collapsed} setCollapsed/>
            <Content></Content>
        </Layout>
    </Layout>    
  )
}

export default UserHomePage