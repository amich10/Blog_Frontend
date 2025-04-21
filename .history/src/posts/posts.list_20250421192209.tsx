import { DeleteOutlined, EditOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Input, Layout, Popconfirm, Table, TablePaginationConfig, Typography } from "antd";
import { useEffect, useState } from "react";
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
    };
}

const PostList = () => {
    const tableColumns = [
        {
            title: "Title",
            dataIndex: "title",
        },
        // {
        //     title: "Slug",
        //     dataIndex: "slug",
        // },
        {
            title: "Category",
            dataIndex: "categoryId",
            render: (category:IPostType['categoryId']) => category?.title || "No category",
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
                    className="w-20 h-15 object-cover"
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
            render: (tags: string[]) => tags.join(", "),
        },
        {
            title: "Status",
            dataIndex: "status",
        },
        {
            title: "Action",
            render: (_: any, record: IPostType) => (
                <div className="flex gap-5">
                    <NavLink to={`/admin/posts/${record._id}`}>
                        <EditOutlined className="text-green-500" />
                    </NavLink>
                    <Popconfirm
                        title="Are you sure you want to delete this post?"
                        onConfirm={() => {}}
                        okText="Yes"
                        cancelText="No"
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
        pageSize: 5,
        total: 0,
        current: 1,
    });

    const [search, setSearch] = useState<string>("");

    const listAllPosts = async ({
        page = pagination.current,
        limit = pagination.pageSize,
        search = "",
    }: IQueryProps) => {
        try {
            const posts = await postSvc.getRequest("/post/all", {
                params: {
                    limit: limit,
                    page: page,
                    search: search,
                },
            });
            setPostData(posts.result.data);
            setPagination((prev) => ({
                ...prev,
                pageSize: posts?.result?.options?.pagination?.limit,
                total: posts?.result?.options?.pagination?.total,
                current: posts?.result?.options?.pagination?.page,
            }));
        } catch (exception) {
            notifcation(
                "Sorry, posts list cannot be retrieved now. Please, try again later.",
                NotificationType.SUCCESS
            );
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
