    import { TablePaginationConfig,Layout,Typography,Input,Table, Popconfirm } from "antd";
    import { useEffect, useState } from "react";
    import { IResponseType } from "../../services/http.service";
    import userSvc from "../../services/user.service";
    import notifcation, { NotificationType } from "../../utilities/helpers";
    import { IQueryProps } from "../category/admin.category";
    import { NavLink } from "react-router";
    import { DeleteOutlined, EditOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";

    export interface IUserType {
        image: {
            url: string;
            optimizedUrl: string;
        };
        _id: string;
        fullName: string;
        username: string;
        email: string;
        password: string;
        role: string;
        phone: string;
        address: string;
        bio: string;
        status: string;
        activationToken: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
        gender: string;
    }



    const UserList = () =>{
        const [data,setData] = useState<Array<IUserType>>([])
        const [loading,setLoading] = useState<boolean>(true)

        const [pagination,setPagination] = useState<TablePaginationConfig>({
            pageSize:8,
            current:1,
            total:0
        })

        const [search,setSearch] = useState<string>('')

        const getAllUsers = async({limit=pagination.pageSize, page=pagination.current, search=''}:IQueryProps) =>{
            try {
                setLoading(true)
                const response: IResponseType = await userSvc.getRequest('/user/all',{
                    params:{
                        limit:limit,
                        page:page,
                        search:search
                    }
                })
                console.log(response)
                setData(response.result.data)
                setPagination((prev) => ({
                    ...prev,
                    pageSize: limit,
                    current: page,
                    total: response.result.options.pagination.total
                }));
            } catch (exception) {
                notifcation("Sorry user list cannot be generated now.", NotificationType.ERROR)
            }
            finally{
                setLoading(false)
            }
        }

        useEffect (() =>{
            getAllUsers({
                limit:pagination.pageSize,
                page:pagination.current,
                search:search

            })
        },[])

        useEffect(() => {
            let timer = setTimeout(() => {
                getAllUsers({
                    page: pagination.current,
                    limit: pagination.pageSize,
                    search: search,
                })
            }, 500)

            return () => clearTimeout(timer)
        },[search])


        const handleTableChange = (pagination:TablePaginationConfig) =>{
            setPagination(pagination)
            getAllUsers({
                page:pagination.current,
                limit:pagination.pageSize,
                search:search
            })
        }


        const tableColumns = [
            {
                title: "Image",
                dataIndex: "image",
                render: (image: IUserType["image"]) =>
                    image && image.optimizedUrl ? (
                        <img
                            src={image.optimizedUrl}
                            alt="user"
                            className="w-10 h-10 object-cover rounded-full"
                        />
                    ) : (
                        <span className="text-gray-400 italic">No Image</span>
                    ),
            },
            {
                title: "Full Name",
                dataIndex: "fullName",
                render: (text: string) => (
                    <span className="font-medium text-gray-800">{text}</span>
                ),
            },
            {
                title: "Username",
                dataIndex: "username",
                render: (text: string) => (
                    <span className="text-blue-600">@{text}</span>
                ),
            },
            {
                title: "Email",
                dataIndex: "email",
            },
            {
                title: "Role",
                dataIndex: "role",
                render: (role: string) => (
                    <span className="capitalize">{role}</span>
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
                    <NavLink to={'/admin/users/'} className="text-green-500!">
                        <EditOutlined/>
                    </NavLink>
                    <Popconfirm title="Arey your sure"
                        description="Once deleted, you cannot revert back."
                        okText="Yes"
                        cancelText="Cancel"
                        okButtonProps={{ className: "bg-red-600!" }}
                        cancelButtonProps={{className:"bg-green-600! text-white!" }}
                        onConfirm={async() =>{
                            try {
                                await userSvc.deleteRequest('user/'+id)
                                notifcation('The selected user has been deleted.',NotificationType.SUCCESS)

                                getAllUsers({
                                    page:pagination.current,
                                    limit:pagination.pageSize,
                                    search:search
                                })
                            } catch (exception) {
                                console.log(exception)
                                notifcation("Sorry, the selected user cannot be deleted now.",NotificationType.ERROR)
                            }
                        }}
                    >
                        <span className="text-red-500">
                            <DeleteOutlined/>
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
                    User Management
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
                dataSource={data}
                rowKey={(record) => record._id}
                pagination={pagination}
                loading={{
                    spinning: loading,
                    indicator: <LoadingOutlined />,
                    tip: "Loading users...",
                    size: "default",
                }}
                onChange={handleTableChange}
                bordered
                />
            </Layout.Content>
        );
    }

    export default UserList;