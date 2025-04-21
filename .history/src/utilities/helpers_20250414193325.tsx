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



//webStorage:LocalStorage


//set localStorage

export const setLocalStorage = (name:string,value:string) =>{
    localStorage.setItem(name,value)
}

//get localStorage 
export const getLocalStorage = (name:string) =>{
     return localStorage.getItem(name)
}

//remove localStorage 

export const removeLocalStorage =(name:string) =>{
    return localStorage.removeItem(name)
}

//remove all
export const cleanLocalStorage =(name:string) =>{
    return localStorage.cle
}