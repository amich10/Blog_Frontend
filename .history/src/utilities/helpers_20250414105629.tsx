import { toast } from "react-toastify"



export enum NotificationType {
    SUCCESS="success",
    ERROR="error",
    WARNING="warning",
    INFO="info"
}

export const notifcation = (msg:string,type=NotificationType) =>{
    if(type ==="success"){
        toast.success(msg)
    }
}