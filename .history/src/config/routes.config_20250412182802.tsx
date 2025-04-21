import { createBrowserRouter } from "react-router";
import { HomePage } from "../pages/home/home.page";


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