import { Layout, Typography } from "antd";


const PostList = () => {
  return (
    <>
    <Layout.Content className="p-4 bg-white shadow-xl">
        <div>
            <Typography.Title level={2} >Posts Management</Typography.Title>
        </div>

    </Layout.Content>    
    </>
  )
};

export default PostList;
