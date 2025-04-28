import { DeleteOutlined, EditOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Input, Layout, Popconfirm, Table, TablePaginationConfig, Typography } from "antd";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import notifcation, { NotificationType } from "../utilities/helpers";
import { IQueryProps } from "../pages/category/admin.category";
import postSvc from "../services/post.service";
import userSvc from "../services/user.service";

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
                <NavLink>
                    
                </NavLink>
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
                <a className="font-medium text-gray-800! italic">{category.title}</a>
            ) : (
                <span className="text-gray-600 italic">No category</span>
            ),
        },
        {
            title: "Images",
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
                <span className="text-gray-600 italic">No images</span>
            ),
        },
        {
            title: "Content",
            dataIndex: "content",
            render: (content: string) => content.slice(0, 50) + "...",
        },
        {
            title: "Tags",
            dataIndex: "tags",
            render: (tags: string[]) => (
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs"
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
                            ? "px-2 py-1 rounded bg-green-100 text-green-700 text-xs"
                            : "px-2 py-1 rounded bg-red-100 text-red-700 text-xs"
                    }
                >
                    {status}
                </span>
            ),
        },
        {
            title: "Action",
            dataIndex:"_id",
            render: (id: IPostType["_id"]) => (
                <div className="flex gap-5">
                    <NavLink to={`/admin/posts/${id}`}>
                        <EditOutlined className="text-green-500!" />
                    </NavLink>
                    <Popconfirm
                        title="Are you sure you want to delete this post?"
                     /*    description="This action cannot be undone. The post will be permanently removed." */
                        okText="Yes"
                        cancelText="Cancel"
                        okButtonProps={{ className: "bg-red-400!" }}
                        cancelButtonProps={{ className: "text-white! bg-green-400!" }}
                        onConfirm={async () => {
                            try {
                                await userSvc.deleteRequest('/post/delete/' + id);
                                notifcation("Post deleted successfully", NotificationType.SUCCESS);
                                listAllPosts({
                                    page:pagination.current,
                                    limit:pagination.pageSize,
                                    search:search
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

    const [postData, setPostData] = useState<Array<IPostType>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        pageSize: 10,
        current: 1,
        total:0
    });

    const [search, setSearch] = useState<string>("");

    const listAllPosts = async ({
        page = pagination.current,
        limit = pagination.pageSize,
        search = "",
    }: IQueryProps) => {
        
        try {
            setLoading(true)
            const posts = await postSvc.getRequest("/post/all", {
                params: {
                    limit: limit,
                    page: page,
                    search: search,
                },
            });
            console.log(posts)
            setPostData(posts.result.data);
            setPagination((prev) => ({
                ...prev,
                pageSize: limit,
                current:page,
                total:posts?.result?.options.total
            }));
        } catch (exception) {
            notifcation(
                "Sorry, posts list cannot be retrieved now. Please, try again later.",
                NotificationType.SUCCESS
            );
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        listAllPosts({
            page: pagination.current,
            limit: pagination.pageSize,
            search: search,
        });
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            listAllPosts({
                page: pagination.current,
                limit: pagination.pageSize,
                search: search,
            });
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    const handleSubmit = (pag: TablePaginationConfig) => {
        setPagination(pag);
        listAllPosts({
            page: pag.current,
            limit: pag.pageSize,
            search: search,
        });

    };

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
