import { createBrowserRouter } from "react-router";
import { HomePage } from "../pages/home/home.page";
import { RegisterPage } from "../pages/register/register.page";


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