import { Layout } from "antd"
import { useState } from "react"
import AdminSideBar from "../../admin/admin.sidebar"

const{Header,Sider,Content} = Layout


const UserHomePage = () => {
    const [collasped,setCollapsed] = useState<boolean>(false)
  return (
    <Layout>
        <AdminSideBar/>
        <Layout>
            <Header></Header>
            <Content></Content>
        </Layout>
    </Layout>    
  )
}

export default UserHomePage