import { createBrowserRouter } from "react-router-dom"; // Make sure to import from react-router-dom
import { lazy, Suspense } from "react";
import { Spin } from "antd";
import ChangePasswordPage from "../pages/change-password after login/change.password";

// Lazy loading other components
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
      <Suspense fallback={<Spin fullscreen tip="Loading...." size="default" />}>
        <RegisterPage />
      </Suspense>
    ),
  },
  {
    path: "/forget-password",
    element: (
      <Suspense fallback={<Spin fullscreen tip="Loading...." size="default" />}>
        <ForgetPasswordPage />
      </Suspense>
    ),
  },
  {
    path: "activate/:activationToken",
    element: (
      <Suspense fallback={<Spin fullscreen tip="Loading...." size="default" />}>
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
      <Suspense fallback={<Spin fullscreen tip="Loading Admin Panel...." size="default" />}>
        <AdminPannelPage />
      </Suspense>
    ),
    children: [
      {
        index: true, // This will render the default route for `/admin`
        element: (
          <Suspense fallback={<Spin fullscreen tip="Loading Admin Panel...." size="default" />}>
            <AdminPannelPage />
          </Suspense>
        ),
      },
      {
        path: "change-password",
        element: (
          <Suspense fallback={<Spin fullscreen tip="Loading Change Password...." size="default" />}>
            <ChangePasswordPage />
          </Suspense>
        ),
      },
    ],
  },
]);
