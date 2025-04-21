import { RouterProvider } from "react-router";
import { router } from "./routes.config";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../context/auth.context";
import { Provider } from "react-redux";
import { store } from "../store/store";

const RouterConfig = () =>{
    return(
       <>
       <Provider store={store}></Provider>
       <AuthProvider>
        <ToastContainer theme="light"/> 
        <RouterProvider router={router}></RouterProvider>
        </AuthProvider>
       </>
    )
}
export default RouterConfig;