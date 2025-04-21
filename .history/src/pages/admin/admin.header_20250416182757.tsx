import { Layout,Button } from "antd"

const AdminHeader = () =>{
    return (
        <>
         <Layout.Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Layout.Header>
        </>
    )
}
export default AdminHeader