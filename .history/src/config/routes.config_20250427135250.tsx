import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import { Spin } from "antd";
//import ChangePasswordPage from "../pages/change-password after login/change.password";

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
const RegisterPage = lazy(() => import("../pages/auth/register/register.page"))
const HomePage = lazy(() => import("../pages/home/home.page"));
const ForgetPasswordPage = lazy(() => import("../pages/auth/forget-password/forget-password"));
const ActivateAccountPage = lazy(() => import("../pages/auth/activate-account/ativate-account"));
const ResetPasswordPage = lazy(() => import("../pages/auth/forget-password/reset-password"));
const AdminPannelPage = lazy(() => import("../pages/admin/admin.pannel"));
import CreateBlog from "./"

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
      element: <RegisterPage />,
    },
    {
      path: "/forget-password",
      element: <ForgetPasswordPage />,
    },
    {
      path: "activate/:activationToken",
      element: <ActivateAccountPage />,
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
      Component:AdminPannelPage,
      children:[
        {
            index:true
        },
        {
          path:'posts',
          Component:PostList
        },
        {
          path:"posts/create",
          Component:CreatePost
        },
        {
          path:"posts/:id",
          Component:EditPost
        },
        {
            path:'category',
            Component:CategoryList
        },
        {
          path:"category/create",
          Component:AddCategory
        },
        {
          path:"category/:id",
          Component:EditCategory
        },
        {
          path:'users',
          Component:UserList
        },
        {
          path:'users/create',
          Component:CreateUser
        },{
          path:"users/:id",
          Component:UserEdit
        },

      ]
    },
    {
      path:'user',
      Component:UserHomePage,
      children:[
        {
          path:'posts',
          Component:ListPosts
        },
        {
          path:'posts/create',
          Component:CreteBlo
        }
      ]
    }
  ]);
  