import { Input, Layout, Typography } from "antd";
import { useState } from "react";


const PostList = () => {
    const [search,setSearch] = useState<string>()
  return (
    <>
    <Layout.Content className="p-4 bg-white shadow-xl">
        <div className="border-b mb-4">
            <Typography.Title level={2} className="text-2xl!">Posts Management</Typography.Title>
        </div>
        <div>
            <Input.Search enterButton="enter" style={{width:"30%"}}
                allowClear
                onChange={(e) =>{setSearch}}
            />
        </div>

    </Layout.Content>    
    </>
  )
};

export default PostList;
