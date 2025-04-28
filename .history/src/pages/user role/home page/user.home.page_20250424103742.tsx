import { Layout } from "antd"

const{Header,Sider,Content} = Layout


const UserHomePage = () => {
  return (
    <Layout>
        <Sider theme="light" collapsible ></Sider>
        <Layout>
            <Header></Header>
            <Content></Content>
        </Layout>
    </Layout>    
  )
}

export default UserHomePage