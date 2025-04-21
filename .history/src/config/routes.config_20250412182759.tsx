import { createBrowserRouter } from "react-router";


export const router = createBrowserRouter([
    {
        path:"/",
        Component:Home
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