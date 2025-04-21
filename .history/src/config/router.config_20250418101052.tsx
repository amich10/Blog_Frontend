import { RouterProvider } from "react-router";
import { router } from "./routes.config";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "../store/store";

const RouterConfig = () =>{
    return(
       <>
       <Provider store={store}>
        <ToastContainer theme="light"/> 
        <RouterProvider router={router}></RouterProvider>
        </Provider>
       </>
    )
}
export default RouterConfig;