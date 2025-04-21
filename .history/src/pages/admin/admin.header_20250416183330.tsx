import { Layout, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

// Define the colorBgContainer variable
const colorBgContainer = "#ffffff";

interface ICollapseProps {
    collapsed: boolean;
    setCollapsed: (value: boolean) => void; // Ensure setCollapsed is a function
}

const AdminHeader = ({ collapsed, setCollapsed }: ICollapseProps) => {
    return (
        <>
            <Layout.Header style={{ padding: 0, background: colorBgContainer }}>
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        fontSize: "16px",
                        width: 64,
                        height: 64,
                    }}
                />
            </Layout.Header>
        </>
    );
};

export default AdminHeader;
export default AdminHeader