import { LoadingOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Input, Layout, Table, Typography } from "antd";
import { useState } from "react";
import { PiUploadDuotone } from "react-icons/pi";
import { NavLink } from "react-router";

export interface IPostType {
    _id: string;
    title: string;
    slug: string;
    content: string;
    tags: string[];
    categoryId: {
        image: {
            url: string;
            optimizedUrl: string;
        };
        "image": {
            "url": "https://res.cloudinary.com/dkunajgg7/image/upload/v1744724763/blog-platform/Category/garskjmo5s37svrwq0pn.jpg",
            "optimizedUrl": "https://res.cloudinary.com/dkunajgg7/image/upload/f_auto,q_auto/v1/blog-platform/Category/garskjmo5s37svrwq0pn?_a=BAMCkGTG0"
        },
        "_id": "67fe631d299340a19531f7b4",
        "title": "Travel and Tourism",
        "slug": "travel-and-tourism",
        "status": "active"
    },
    "authorId": null,
    "status": "published",
    "views": 0,
    "likes": [],
    "commentsCount": 0,
    "publishedAt": "2025-04-15T14:04:32.336Z",
    "images": [
        {
            "url": "https://res.cloudinary.com/dkunajgg7/image/upload/v1744725873/blog-platform/Posts/tliotfm11ppwcqgzabyb.jpg",
            "optimizedUrl": "https://res.cloudinary.com/dkunajgg7/image/upload/f_auto,q_auto/v1/blog-platform/Posts/tliotfm11ppwcqgzabyb?_a=BAMCkGTG0",
            "_id": "67fe6774059f5d108ecfec9d"
        },
        {
            "url": "https://res.cloudinary.com/dkunajgg7/image/upload/v1744725874/blog-platform/Posts/ixa8qc5mndwjifeacocj.jpg",
            "optimizedUrl": "https://res.cloudinary.com/dkunajgg7/image/upload/f_auto,q_auto/v1/blog-platform/Posts/ixa8qc5mndwjifeacocj?_a=BAMCkGTG0",
            "_id": "67fe6774059f5d108ecfec9e"
        }
    ],

}

const PostList = () => {
  const [search, setSearch] = useState<string>();

    const tableColumns = [
        {
            title: "Title",
            dataIndex: "title",
        },
        {
            title:"Slug",
            dataIndex:"slug"
        },
        {
            title:"Category",
            dataIndex:""
        },
        {
            title:"Image",
            dataIndex:""
        },
        {
            title:"Content",
            dataIndex:""
        },
        {
            title:"Tags",
            dataIndex:""
        },
        {
            title:"Status",
            dataIndex:""
        },
        {
            title:"Action",

        }

    ];


    const [postData,setPostData] = useState<>()

  return (
    <>
      <Layout.Content className="bg-white rounded-md p-8 shadow-md">
        <div className="flex items-center justify-between border-b pb-4 mb-6">
          <Typography.Title
            level={2}
            className="!mb-0 !text-2xl font-semibold text-gray-800"
          >
            Posts Management
          </Typography.Title>
          <NavLink
            to="/admin/users/create"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded transition"
          >
            <PlusOutlined /> Add User
          </NavLink>
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

        <Table
          size="middle"
          columns={tableColumns}
          /* dataSource={data}
          rowKey={(record) => record._id}
          pagination={pagination}
          loading={{
            spinning: loading,
            indicator: <LoadingOutlined/>,
            tip: "Loading posts...",
            size: "default",
          }}
          onChange={handleTableChange}
          bordered */
        />
      </Layout.Content>
    </>
  );
};

export default PostList;
