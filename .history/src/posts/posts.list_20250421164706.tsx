import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Input, Layout, Typography } from "antd";
import { useState } from "react";
import { PiUploadDuotone } from "react-icons/pi";
import { NavLink } from "react-router";


const PostList = () => {
    const [search,setSearch] = useState<string>()
  return (
    <>
    <Layout.Content className="p-4 bg-white shadow-xl">
        <div className="border-b pb-4 mb-6 flex justify-between items-center">
            <Typography.Title level={2} className="text-2xl!">Posts Management</Typography.Title>
            <NavLink to={'/posts/create'} className="text-bold text-xl font-semibold"> <PlusOutlined/> Create Post</NavLink>
        </div>
        <div>
            <Input.Search enterButton="search" style={{width:"30%"}}
                allowClear
                placeholder="Search posts"
                onChange={(e) =>{setSearch(e.target.value)}}
            />
        </div>

    </Layout.Content>    
    </>
  )
};

export default PostList;
