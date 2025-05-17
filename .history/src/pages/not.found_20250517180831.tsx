import { Layout, Result, Button } from "antd";
import { NavLink } from "react-router";

const { Content } = Layout;

const NotFoundPage = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content className="flex items-center justify-center p-8 bg-white">
        <Result
          status="404"
          title="404"
          subTitle="Sorry, we couldn't find this page."
          extra={
            <NavLink to="/blogs">
              <Button type="primary" size="large" style:{}>
                Back to Home
              </Button>
            </NavLink>
          }
        />
      </Content>
    </Layout>
  );
};

export default NotFoundPage;
