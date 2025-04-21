import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import { Spin } from "antd";
import ChangePasswordPage from "../pages/change-password after login/change.password";

const RegisterPage = lazy(() => import("../pages/auth/register/register.page"))
const HomePage = lazy(() => import("../pages/home/home.page"));
const ForgetPasswordPage = lazy(() => import("../pages/auth/forget-password/forget-password"));
const ActivateAccountPage = lazy(() => import("../pages/auth/activate-account/ativate-account"));
const ResetPasswordPage = lazy(() => import("../pages/auth/forget-password/reset-password"));
const AdminPannelPage = lazy(() => import("../pages/admin/admin.pannel"));


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={<Spin fullscreen tip="Loading...." size="default" />}>
            <HomePage />
        </Suspense>
    },
    {
        path: "/register",
        Component: RegisterPage
    },
    {
        path: '/forget-password',
        Component: ForgetPasswordPage
    },
    {
        path: 'activate/:activationToken',
        Component: ActivateAccountPage
    },
    {
        path: "verify-token/:forgetToken",
        element: <Suspense fallback={<Spin fullscreen tip="Verifying token...." size="large" />}>
            <ResetPasswordPage></ResetPasswordPage>
        </Suspense>
    },
    {
        path: "admin",
        Component: AdminPannelPage,
        children:[
            {
                index:tru
            }
            {
                path:"change-password",
                Component:ChangePasswordPage
            }
        ]
    }
])