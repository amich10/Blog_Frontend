import React from "react";
import { createBrowserRouter } from "react-router";
import { Suspense } from "react";
import { Spin } from "antd";

const CategoryList = React.lazy(() => import("../pages/admin/category/admin.category"));
const AddCategory = React.lazy(() => import("../pages/admin/category/add.category"));
const EditCategory = React.lazy(() => import("../pages/admin/category/edit.category"));
const PostList = React.lazy(() => import("../pages/admin/posts/posts.list"));
const CreatePost = React.lazy(() => import("../pages/admin/posts/post.create"));
const EditPost = React.lazy(() => import("../pages/admin/posts/edit.post"));
const PostDetail = React.lazy(() => import("../pages/user role/post.detail"));
const UserProfilePage = React.lazy(() => import("../pages/user role/user.profile.page"));
const AdminDashBoard = React.lazy(() => import("../pages/admin/admin.dashboard"));
const EditProfile = React.lazy(() => import("../pages/user role/edit.profle"));
const AdminPannelPage = React.lazy(() => import("../Layouts/admin.layout/admin.pannel"));
const HomePage = React.lazy(() => import("../pages/auth/login.page"));
const RegisterPage = React.lazy(() => import("../pages/auth/register.page"));
const ForgetPasswordPage = React.lazy(() => import("../pages/auth/forget-password"));
const ActivateAccountPage = React.lazy(() => import("../pages/auth/ativate-account"));
const ResetPasswordPage = React.lazy(() => import("../pages/auth/reset-password"));
const UserList = React.lazy(() => import("../pages/admin/users/admin.user.list"));
const CreateUser = React.lazy(() => import("../pages/admin/users/admin.adduser"));
const UserEdit = React.lazy(() => import("../pages/admin/users/admin.user.edit"));
const NotFoundPage = React.lazy(() => import("../pages/not found/not.found"));
const UserHomePage = React.lazy(() => import("../Layouts/user.layout/user.home.page"));
const ListPosts = React.lazy(() => import("../pages/user role/list.post"));
const CreateBlog = React.lazy(() => import("../pages/user role/create.blog"));
const ProfilePage = React.lazy(() => import("../pages/user role/profile.page"));
import { LoadingOutlined } from "@ant-design/icons";
import EditBlog from "../pages/user role/edit.post";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Spin tip="Loading...." size="default" indicator={<LoadingOutlined/>} />}>
        <HomePage />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<Spin fullscreen tip="Loading..." size="default" />}>
        <RegisterPage />
      </Suspense>
    ),
  },
  {
    path: "/forget-password",
    element: (
      <Suspense fallback={<Spin fullscreen tip="Loading..." size="default" />}>
        <ForgetPasswordPage />
      </Suspense>
    ),
  },
  {
    path: "activate/:activationToken",
    element: (
      <Suspense
        fallback={<Spin fullscreen tip="Verifying account..." size="default" />}
      >
        <ActivateAccountPage />
      </Suspense>
    ),
  },
  {
    path: "verify-token/:forgetToken",
    element: (
      <Suspense
        fallback={<Spin fullscreen tip="Verifying token...." size="large" />}
      >
        <ResetPasswordPage />
      </Suspense>
    ),
  },
  {
    path: "admin",
    element: (
      <Suspense
        fallback={<Spin fullscreen tip="Loading Admin..." size="large" />}
      >
        <AdminPannelPage />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <AdminDashBoard />,
      },
      {
        path: "posts",
        element: <PostList />,
      },
      {
        path: "posts/create",
        element: <CreatePost />,
      },
      {
        path: "posts/:slug",
        element: <EditPost />,
      },
      {
        path: "category",
        element: <CategoryList />,
      },
      {
        path: "category/create",
        element: <AddCategory />,
      },
      {
        path: "category/:id",
        element: <EditCategory />,
      },
      {
        path: "users",
        element: <UserList />,
      },
      {
        path: "users/create",
        element: <CreateUser />,
      },
      {
        path: "users/:id",
        element: <UserEdit />,
      },
    ],
  },
  {
    path: "blogs",
    element: <UserHomePage />,
    children: [
      {
        index: true,
        element: <Suspense fallback= {<Spin fullscreen tip="Loading posts..." size="large" indicator={<LoadingOutlined/>}/>}>
          <ListPosts/>
        </Suspense>,
      },
      {
        path: "create",
        element: <CreateBlog />,
      },
      {
        path: ":slug",
        element: <PostDetail />,
      },
      {
        path: "my-profile",
        element: <ProfilePage />,
      },
      {
        path:"edit/:slug",
        element:<EditBlog/>
      },
      {
        path: "profile/:id",
        element: <UserProfilePage />,
      },
      {
        path: "profile-edit",
        element: <EditProfile />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage/>,
  },
]);
