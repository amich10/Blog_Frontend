import { createBrowserRouter } from "react-router";
import { Suspense } from "react";
import { Spin } from "antd";

import CategoryList from "../pages/admin/category/admin.category";
import AddCategory from "../pages/admin/category/add.category";
import EditCategory from "../pages/admin/category/edit.category";
import PostList from "../pages/admin/posts/posts.list";
import CreatePost from "../pages/admin/posts/post.create";
import EditPost from "../pages/admin/posts/edit.post";
import UserHomePage from "../pages/user role/home page/user.home.page";
import ListPosts from "../pages/user role/home page/list.post";
import CreateBlog from "../pages/user role/home page/create.blog";
import PostDetail from "../pages/user role/post.detail";
import ProfilePage from "../pages/user role/home page/profile.page";
import UserProfilePage from "../pages/user role/user.profile.page";
import AdminDashBoard from "../pages/admin/admin.dashboard";
import EditProfile from "../pages/user role/edit.profle";
import NotFound from "../pages/not.found";
import AdminPannelPage from "../Layouts/admin.layout/admin.pannel";
import HomePage from "../pages/auth/login.page";
import RegisterPage from "../pages/auth/register.page";
import ForgetPasswordPage from "../pages/auth/forget-password";
import ActivateAccountPage from "../pages/auth/ativate-account";
import ResetPasswordPage from "../pages/auth/reset-password";
import UserList from "../pages/admin/users/admin.user.list";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Spin fullscreen tip="Loading...." size="default" />}>
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
        element: <ListPosts />,
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
    element: <NotFound />,
  },
]);
