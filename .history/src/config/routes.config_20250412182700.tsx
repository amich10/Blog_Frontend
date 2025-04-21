import { createBrowserRouter } from "react-router";
import { HomePage } from "../../../pages/home/home.page";
import { RegisterPage } from "../../../pages/auth/register/register.page";
import ForgetPasswordPage from "../../../pages/auth/forget-password/forget-password";

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
    }
])