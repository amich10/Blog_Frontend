import { createBrowserRouter } from "react-router";
import { HomePage } from "../pages/home/home.page";
import { RegisterPage } from "../pages/register/register.page";
import ForgetPasswordPage from "../pages/auth/forget-password/forget-password";
import ActivateAccountPage from "../pages/auth/activate-account/ativate-account";
import ResetPasswordPage from "../pages/auth/forget-password/reset-password";
import { Suspense } from "react";
import { Spin } from "antd";


export const router = createBrowserRouter([
    {
        path:"/",
        Component:HomePage
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
        path:"verify-token/:resetToken",
        element:<Suspense fallback={<Spin fullscreen tip="Verifying token...." size="large"/>}>
            <ResetPasswordPage></ResetPasswordPage>
        </Suspense>
    }
])