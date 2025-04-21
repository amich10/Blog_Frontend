import { LoadingOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Input, Layout, Table, TablePaginationConfig, Typography } from "antd";
import { useEffect, useState } from "react";
import { PiUploadDuotone } from "react-icons/pi";
import { NavLink } from "react-router";
import notifcation, { NotificationType } from "../utilities/helpers";
import { IQueryProps } from "../pages/category/admin.category";
import postSvc from "../services/post.service";

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
        _id: string;
        title: string;
        slug: string;
        status: string;
    };
    authorId: string | null;
    status: string;
    views: number;
    likes: any[];
    commentsCount: number;
    images: {
        url: string;
        optimizedUrl: string;
    }
}

const PostList = () => {

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


    const [postData,setPostData] = useState<IPostType>()
    const [loading,setLoading] = useState<boolean>()
    const [pagination,setPagination]=useState<TablePaginationConfig>({
        pageSize:5,
        total:0,
        current:1
    })

    const [search,setSearch] = useState<string>("")

    const listAllPosts = async({page=pagination.current,limit=pagination.current,search=""}:IQueryProps) =>{
        try {

            const posts = await postSvc.getRequest('/post/all',{
                params:{
                    limit:limit,
                    page:page,
                    search:search
                }
            })
            console.log(posts)
            setPostData(posts.result.data)
            setPagination((prev) => ({
                ...prev,
                pageSize: posts.result.options.pagination.limit,
                total: posts.result.options.pagination.total,
                current: posts.result.options.pagination.page,
            }));
        } catch (exception) {
            notifcation('Sorry, posts list cannot be retrieved now. Please, try again later.',NotificationType.SUCCESS)
        }
    }

    //whe the page renders for the first time this effect calls getAllposts
    // with the current pagination settings and empty search
    //this ensurs that the post list is populated as soon as page loads
    useEffect(() =>{
        listAllPosts({
            page:pagination.current,
            limit:pagination.pageSize,
            search:search
        })
    },[])


    //for search
    useEffect(() =>{
        const timer  = setInterval(())
    })

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
