import { DeleteOutlined, EditOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Input, Layout, Popconfirm, Table, TablePaginationConfig, Typography } from "antd";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import notifcation, { NotificationType } from "../utilities/helpers";
import { IQueryProps } from "../pages/category/admin.category";
import postSvc from "../services/post.service";
import userSvc from "../services/user.service";
import { usePost } from "../context/post.context";

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
    };
}

const PostList = () => {
    const tableColumns = [
        {
            title: "Title",
            dataIndex: "title",
            render: (title: string) => (
                <span className="text-xs font-semibold">
                    {title}
                </span>
            ),
        },
       /*  {
            title: "Slug",
            dataIndex: "slug",
        }, */
        {
            title: "Category",
            dataIndex: "categoryId",
            render: (category: IPostType["categoryId"]) =>
            category ? (
                <span className="bg-yellow-100! px-2 py-1 rounded-md text-xs text-yellow-700!">{category.title}</span>
            ) : (
                <span className="text-gray-600 italic">No category</span>
            ),
        },
        {
            title: "Image",
            dataIndex: "images",
            render: (images: IPostType["images"][]) =>
            images && images.length > 0 ? (
                <div className="flex gap-2">
                {images.map((image, index) => (
                    <img
                    key={index}
                    src={image.optimizedUrl}
                    alt={`image-${index}`}
                    className="w-15 h-10 object-cover rounded-md"
                    />
                ))}
                </div>
            ) : (
                <span className="text-gray-600 italic">No image</span>
            ),
        },
        {
            title: "Content",
            dataIndex: "content",
            render: (content: string) =>(
                <span className="text-xs">
                    { content.slice(0, 50) + "..."}
                </span>
            ),
        },
        {
            title: "Tags",
            dataIndex: "tags",
            render: (tags: string[]) => (
                <div className="flex flex-wrap gap-1">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (status: string) => (
                <span
                    className={
                        status === "published"
                            ? "px-2 py-1 rounded bg-green-100 text-green-800 text-xs"
                            : "px-2 py-1 rounded bg-red-100 text-red-700 text-xs"
                    }
                >
                    {status}
                </span>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_: any, record: IPostType) => (
                <div className="flex gap-5">
                    <NavLink to={`/admin/posts/${record.slug}`}>
                        <EditOutlined className="text-green-500!" />
                    </NavLink>
                    <Popconfirm
                        title="Are you sure you want to delete this post?"
                        okText="Yes"
                        cancelText="Cancel"
                        okButtonProps={{ className: "bg-red-400!" }}
                        cancelButtonProps={{ className: "text-white! bg-green-400!" }}
                        onConfirm={async () => {
                            try {
                                await userSvc.deleteRequest('/post/delete/' + record._id);
                                notifcation("Post deleted successfully", NotificationType.SUCCESS);
                                listAllPosts({
                                    page: pagination.current,
                                    limit: pagination.pageSize,
                                    search: search
                                })
                            } catch (exception) {
                                notifcation("Sorry, the post cannot be deleted now. Please try again later.", NotificationType.ERROR);
                            }
                        }}
                    >
                        <span>
                            <DeleteOutlined className="text-red-600!" />
                        </span>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const {posts,se} = usePost()
    const postData = posts
    
        
    

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
                        to="/admin/posts/create"
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded transition"
                    >
                        <PlusOutlined /> Create Post
                    </NavLink>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <Input.Search
                        allowClear
                        enterButton="Search"
                        placeholder="Search posts..."
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-xs"
                    />
                </div>

                <div className="overflow-x-auto">
                    <Table
                        size="middle"
                        columns={tableColumns}
                        dataSource={postData}
                        rowKey={(record) => record._id}
                        pagination={pagination}
                        loading={{
                            spinning: loading,
                            indicator: <LoadingOutlined />,
                            tip: "Loading posts...",
                            size: "default",
                        }}
                        onChange={handleSubmit}
                        bordered
                        scroll={{ x: "max-content" }}
                    />
                </div>
            </Layout.Content>
        </>
    );
};

export default PostList;
