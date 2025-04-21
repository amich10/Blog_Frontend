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
    }else if(type ===NotificationType.ERROR){
        toast.error(msg)
    }else if(type===NotificationType.WARNING){
        toast.warning(msg)
    }else if(type ===NotificationType.INFO){
        toast.info(msg)
    }else{
        toast(msg)
    }
}

export default notifcation;