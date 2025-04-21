import { createBrowserRouter } from "react-router";

import { RegisterPage } from "../pages/register/register.page";
import ForgetPasswordPage from "../pages/auth/forget-password/forget-password";
import ActivateAccountPage from "../pages/auth/activate-account/ativate-account";
import ResetPasswordPage from "../pages/auth/forget-password/reset-password";
import { lazy, Suspense } from "react";
import AdminPannelPage from "../pages/admin/admin.pannel";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
const HomePage = lazy(() => import("../pages/home/home.page"));


export const router = createBrowserRouter([
    {
        path:"/",
        element:<Suspense fallback={<Spin fullscreen tip="Loading..." size="large" indicator={<LoadingOutlined/>} ></Spin>}>
            <HomePage/>
        </Suspense>
    },
    {
        path:"/register",
        Component:RegisterPage
    },
    {
        path:'/forget-password',
        Component:ForgetPasswordPage
    },
    {
        path:'activate/:activationToken',
        Component:ActivateAccountPage
    },
    {
        path:"verify-token/:forgetToken",
        element:<Suspense fallback={<Spin fullscreen tip="Verifying token...." size="large"/>}>
            <ResetPasswordPage></ResetPasswordPage>
        </Suspense>
    },
    {
        path:"admin",
        Component:AdminPannelPage
    }
])