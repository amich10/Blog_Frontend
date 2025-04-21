import { Layout, Typography } from "antd";


const PostList = () => {
  return (
    <>
    <Layout.Content className="p-4 bg-white shadow-xl">
        <div className="border-b">
            <Typography.Title level={2} className="text-2xl">Posts Management</Typography.Title>
        </div>

    </Layout.Content>    
    </>
  )
};

export default PostList;
