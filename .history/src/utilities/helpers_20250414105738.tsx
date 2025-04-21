import { toast } from "react-toastify"



export enum NotificationType {
    SUCCESS="success",
    ERROR="error",
    WARNING="warning",
    INFO="info"
}

const notifcation = (msg:string,type:NotificationType) =>{
    if(type ===NotificationType.SUCCESS){
        toast.success(msg)
    }else
}

export default notifcation;