import { useEffect, useState } from "react";
import categorySVc from "../../services/category.service";
import { TablePaginationConfig } from "antd";
import { Layout, Typography, Input, Table } from "antd";
import { NavLink } from "react-router";
import { PlusOutlined } from "@ant-design/icons";
import { IResponseType } from "../../services/http.service";

export interface IResult {
    image: {
        url: string;
        optimizedUrl: string;
    };
    _id: string;
    title: string;
    slug: string;
    parentId: string | null;
    status: string;
    createdBy: {
        _id: string;
        username: string;
        email: string;
        role: string;
        status: string;
    };
    updatedBy: any;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IQueryProps {
    page?: number;
    limit?: number;
    search?: string | null;
}

const CategoryList = () => {
    const [data, setData] = useState<Array<IResult>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        total: 0,
        pageSize: 2,
        current: 1,
    });
    const [search, setSearch] = useState<string>("");

    const getAllCategory = async ({
        page = pagination.current,
        limit = pagination.pageSize,
        search = "",
    }: IQueryProps) => {
        try {
            setLoading(true);
            const response: IResponseType = await categorySVc.getRequest(
                "/category/all",
                {
                    params: {
                        page: page,
                        limit: limit,
                        search: search,
                    },
                }
            );
            // Assuming response.result has shape: { data: IResult[], total: number }
            setData(response.result.data);
            setPagination((prev) => ({
                ...prev,
                total: ((response.result as unknown) as { total: number }).total || 0,
                current: page,
                pageSize: limit,
            }));
            setLoading(false);
        } catch (exception) {
            setLoading(false);
            // Optionally handle error here
        }
    };

    useEffect(() => {
        getAllCategory({
            page: pagination.current,
            limit: pagination.pageSize,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            getAllCategory({
                page: 1,
                limit: pagination.pageSize,
                search: search,
            });
        }, 500);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    const handleTableChange = (pag: TablePaginationConfig) => {
        setPagination(pag);
        getAllCategory({
            page: pag.current,
            limit: pag.pageSize,
            search: search,
        });
    };

    const tableColumns = [
        {
            title: "Category",
            dataIndex: "title",
        },
        {
            title: "Url",
            dataIndex: "slug",
        },
        {
            title: "Image",
            dataIndex: "image",
            render: (image: IResult["image"]) =>
                image && image.optimizedUrl ? (
                    <img
                        src={image.optimizedUrl}
                        alt="category"
                        style={{ width: 40, height: 40, objectFit: "cover" }}
                    />
                ) : (
                    "No Image"
                ),
        },
        {
            title: "Status",
            dataIndex: "status",
        },
        {
            title: "Action",
            dataIndex: "_id",
            render: (id: string) => (
                <NavLink
                    to={`/admin/category/edit/${id}`}
                    className="text-blue-500 underline"
                >
                    Edit
                </NavLink>
            ),
        },
    ];

    return (
        <>
            <Layout.Content className="rounded-md p-5">
                <div className="border-b border-b-gray-500">
                    <Typography.Title className=" text-3xl p-2">
                        All Categories
                    </Typography.Title>
                </div>
                <div className="flex justify-between mt-3">
                    <Input.Search
                        enterButton
                        placeholder="Search category"
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                        className="w-100!"
                    />
                    <NavLink
                        to="/admin/category/create"
                        className=" border-2 border-blue-500  rounded-md p-1.5"
                    >
                        <PlusOutlined /> Add category
                    </NavLink>
                </div>
                <div className="mt-3">
                    <Table
                        size="small"
                        columns={tableColumns}
                        dataSource={data}
                        rowKey={(record) => record._id}
                        pagination={pagination}
                        loading={{
                            spinning: loading,
                            tip: "Loading categories...",
                            size: "small",
                        }}
                        onChange={handleTableChange}
                    />
                </div>
            </Layout.Content>
        </>
    );
};

export default CategoryList;