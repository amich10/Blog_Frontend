import { RouterProvider } from "react-router";
import { router } from "./routes.config";

const RouterConfig = () =>{
    return(
       <RouterProvider router={router}></RouterProvider> 
    )
}
export default RouterConfig;