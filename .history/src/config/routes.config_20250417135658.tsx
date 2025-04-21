import { createBrowserRouter } from "react-router";
import { HomePage } from "../pages/home/home.page";
import { RegisterPage } from "../pages/register/register.page";
import ForgetPasswordPage from "../pages/auth/forget-password/forget-password";
import ActivateAccountPage from "../pages/auth/activate-account/ativate-account";
import ResetPasswordPage from "../pages/auth/forget-password/reset-password";
import { Suspense } from "react";
import { Spin } from "antd";
import AdminPannelPage from "../pages/admin/admin.pannel";


export const router = createBrowserRouter([
    {
        path:"/",
        element:<Suspense>
            
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