import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Input, Layout, Typography } from "antd";
import { useState } from "react";
import { PiUploadDuotone } from "react-icons/pi";
import { NavLink } from "react-router";


const PostList = () => {
    const [search,setSearch] = useState<string>()
  return (
    <>
    <Layout.Content className="bg-white rounded-md p-8 shadow-md">
        <div className="flex items-center justify-between border-b pb-4 mb-6">
            <Typography.Title level={2} className="text-2xl!">Posts Management</Typography.Title>
            <NavLink to={'/posts/create'} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded transition"> <PlusOutlined/> Create Post</NavLink>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <Input.Search
                    allowClear
                    enterButton="Search"
                    placeholder="Search user..."
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-xs"
                />
                </div>

    </Layout.Content>    
    </>
  )
};

export default PostList;
