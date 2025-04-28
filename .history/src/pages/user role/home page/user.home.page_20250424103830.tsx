import { Layout } from "antd"
import { useState } from "react"

const{Header,Sider,Content} = Layout


const UserHomePage = () => {
    const [collasped,setCollapsed] = useState<boolean>(false)
  return (
    <Layout>
        <Sider theme="light"  trigger={null} collapsible ></Sider>
        <Layout>
            <Header></Header>
            <Content></Content>
        </Layout>
    </Layout>    
  )
}

export default UserHomePage