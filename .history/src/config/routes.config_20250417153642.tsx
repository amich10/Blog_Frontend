import { createBrowserRouter } from "react-router";

import { RegisterPage } from "../pages/register/register.page";
import { lazy, Suspense } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
const HomePage = lazy(() => import("../pages/home/home.page"));


export const router = createBrowserRouter([
    {
        path:"/",
        element:<HomePage/>
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