import { useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import authSvc from "../../../services/auth.service";

const ActivateAccountPage = () =>{
    const [loading,setLoading] =useState<boolean>();

    const activateAccount = async() =>{
        try {
            await authSvc.getRequest('/auth/activate'+)
        } catch (exception) {
            
        }
    } 
    return (
        <>
        {loading ? <Spin tip="Activating your account. Please hold on." indicator={<LoadingOutlined/>} size="large" ></Spin>:<></>}
        </>
    )
}

export default ActivateAccountPage;