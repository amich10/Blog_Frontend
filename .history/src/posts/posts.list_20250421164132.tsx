import { Input, Layout, Typography } from "antd";
import { useState } from "react";
import { NavLink } from "react-router";


const PostList = () => {
    const [search,setSearch] = useState<string>()
  return (
    <>
    <Layout.Content className="p-4 bg-white shadow-xl">
        
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
