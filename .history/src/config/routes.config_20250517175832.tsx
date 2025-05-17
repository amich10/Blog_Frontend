import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import { Spin } from "antd";

import CategoryList from "../pages/category/admin.category";
import UserList from "../pages/users/admin.user.list";
import CreateUser from "../pages/users/admin.adduser";
import UserEdit from "../pages/users/admin.user.edit";
import AddCategory from "../pages/category/add.category";
import EditCategory from "../pages/category/edit.category";
import PostList from "../posts/posts.list";
import CreatePost from "../posts/post.create";
import EditPost from "../posts/edit.post";
import UserHomePage from "../pages/user role/home page/user.home.page";
import ListPosts from "../pages/user role/home page/list.post";
import CreateBlog from "../pages/user role/home page/create.blog";
import PostDetail from "../pages/user role/post.detail";
import ProfilePage from "../pages/user role/home page/profile.page";
import UserProfilePage from "../pages/user role/user.profile.page";
import AdminDashBoard from "../pages/admin/admin.dashboard";
import EditProfile from "../pages/user role/edit.profle";

const RegisterPage = lazy(() => import("../pages/auth/register/register.page"));
const HomePage = lazy(() => import("../pages/home/home.page"));
const ForgetPasswordPage = lazy(() => import("../pages/auth/forget-password/forget-password"));
const ActivateAccountPage = lazy(() => import("../pages/auth/activate-account/ativate-account"));
const ResetPasswordPage = lazy(() => import("../pages/auth/forget-password/reset-password"));
const AdminPannelPage = lazy(() => import("../pages/admin/admin.pannel"));

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
      <Suspense fallback={<Spin fullscreen tip="Verifying account..." size="default" />}>
        <ActivateAccountPage />
      </Suspense>
    ),
  },
  {
    path: "verify-token/:forgetToken",
    element: (
      <Suspense fallback={<Spin fullscreen tip="Verifying token...." size="large" />}>
        <ResetPasswordPage />
      </Suspense>
    ),
  },
  {
    path: "admin",
    element: (
      <Suspense fallback={<Spin fullscreen tip="Loading Admin..." size="large" />}>
        <AdminPannelPage />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <AdminDashBoard/>
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
        path:":slug",
        element:<PostDetail/>
      },{
        path:"my-profile",
        element:<ProfilePage/>
      },{
        path:'profile/:id',
        element:<UserProfilePage/>
      }
      ,{
        path:"profile-edit",
        element:<EditProfile/>
      }
    ],
  },{
    path:"*",
    element:<N
  }
  
]);
