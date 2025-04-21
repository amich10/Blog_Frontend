import { toast } from "react-toastify"


export enum NotificationType {
    SUCCESS="success",
    ERROR="error",
    WARNING="warning",
    INFO="info"
}

const notifcation = (msg: string, type: NotificationType = NotificationType.SUCCESS) => {
    if (type === NotificationType.SUCCESS) {
        toast.success(msg);
    }
};