import { useEffect, useState } from "react";
import categorySVc from "../../services/category.service";
import { Popconfirm, TablePaginationConfig } from "antd";
import { Layout, Typography, Input, Table } from "antd";
import { NavLink } from "react-router";
import { DeleteOutlined, EditOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { IResponseType } from "../../services/http.service";
import notifcation, { NotificationType } from "../../utilities/helpers";

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
        pageSize: 5,
        current: 1,
    });
    const [search, setSearch] = useState<string>("");

    const getAllCategory = async ({page = pagination.current,limit = pagination.pageSize,search = "",}: IQueryProps) => {
        try {
            setLoading(true);
            const response: IResponseType = await categorySVc.getRequest("/category/all",{
                    params: {
                        page: page,
                        limit: limit,
                        search: search,
                    },
                }
            );
            console.log(response)
            setData(response.result.data);
            setPagination((prev) => ({
                ...prev,
                total:response.result.options.total,
                current: page,
                pageSize: limit,
            }));
            setLoading(false);
        } catch (exception) {
            setLoading(false);
            notifcation("Sorry, the list of categories cannot be retireved now. Please,try again later",NotificationType.ERROR)
        }
    };

    useEffect(() => {
        getAllCategory({
            page: pagination.current,
            limit: pagination.pageSize,
        });
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            getAllCategory({
                page: pagination.current,
                limit: pagination.pageSize,
                search: search,
            });
        }, 500);
        return () => clearTimeout(timer);
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
            render: (text: string) => (
                <span className="font-medium text-gray-800">{text}</span>
            ),
        },
        {
            title: "Url",
            dataIndex: "slug",
            render: (text: string) => (
                <span className="text-blue-600 italic">{text}</span>
            ),
        },
        {
            title: "Image",
            dataIndex: "image",
            render: (image: IResult["image"]) =>
                image && image.optimizedUrl ? (
                    <img
                        src={image.optimizedUrl}
                        alt="category"
                        className="w-10 h-10 object-cover"
                    />
                ) : (
                    <span className="text-gray-400 italic">No Image</span>
                ),
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (status: string) => (
                <span
                    className={
                        status === "active"
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
            dataIndex: "_id",
            render: (id: string) => (
              <div className="flex gap-5">
                <NavLink to={"/admin/category"+id} className="text-green-500!">
                <EditOutlined/>
              </NavLink>
              <Popconfirm
               title="Are you sure?"
               description="You cannot revert the deleted item."
               okText="Yes"
               cancelText="Cancel"
               okButtonProps={{className:"bg-red-600!"}}
               cancelButtonProps={{className:"bg-green-600"}}
               onConfirm={async() =>{
                try {
                    await categorySVc.deleteRequest('category/delete/'+id)
                    notifcation("Category deleted successfully",NotificationType.SUCCESS)
                } catch (exception) {
                    
                }
               }}
               >
              <span className="text-red-600!">
                  <DeleteOutlined />
                </span>
                </Popconfirm>
              </div>
              
            ),
        },
    ];

    return (
        <Layout.Content className="bg-white rounded-md p-8 shadow-md">
            <div className="flex items-center justify-between border-b pb-4 mb-6">
            <Typography.Title level={2} className="!mb-0 !text-2xl font-semibold text-gray-800">
                Category Management
            </Typography.Title>
            <NavLink
                to="/admin/category/create"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded transition"
            >
                <PlusOutlined /> Add Category
            </NavLink>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <Input.Search
                allowClear
                enterButton="Search"
                placeholder="Search category..."
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-xs"
            />
            </div>
            <Table
            size="middle"
            columns={tableColumns}
            dataSource={data}
            rowKey={(record) => record._id}
            pagination={pagination}
            loading={{
                spinning: loading,
                indicator:<LoadingOutlined/>,
                tip: "Loading categories...",
                size: "default",
            }}
            onChange={handleTableChange}
            bordered
            />
        </Layout.Content>
    );
};

export default CategoryList;