import { Layout,Button } from "antd"
import {MenuFoldOutlined,MenuUnfoldOutlined} from '@ant-design/icons';


export interface ICollapseProps {
    collapsed:boolean,
    setCollapsed:Function
}
const AdminHeader = ({collapsed,setCollapsed}:ICollapseProps) =>{
    return (
        <>
         <Layout.Header className="bg-white! flex ju">
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