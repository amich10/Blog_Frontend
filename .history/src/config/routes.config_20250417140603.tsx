import { createBrowserRouter } from "react-router";
import { RegisterPage } from "../pages/register/register.page";
import ForgetPasswordPage from "../pages/auth/forget-password/forget-password";
import ActivateAccountPage from "../pages/auth/activate-account/activate-account"; // Fixed typo 'ativate-account' -> 'activate-account'
import ResetPasswordPage from "../pages/auth/forget-password/reset-password";
import { lazy, Suspense } from "react";
import AdminPannelPage from "../pages/admin/admin.pannel";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

// Lazy load the HomePage component
const HomePage = lazy(() => import("../pages/home/home.page"));

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Suspense
                fallback={<Spin fullscreen tip="Loading..." size="large" indicator={<LoadingOutlined />} />}
            >
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
        path: "/activate/:activationToken",
        element: <ActivateAccountPage />,
    },
    {
        path: "/verify-token/:forgetToken",
        element: (
            <Suspense fallback={<Spin fullscreen tip="Verifying token...." size="large" />}>
                <ResetPasswordPage />
            </Suspense>
        ),
    },
    {
        path: "/admin",
        element: <AdminPannelPage />,
    },
]);
