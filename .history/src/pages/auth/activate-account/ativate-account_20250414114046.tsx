import { useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import authSvc from "../../../services/auth.service";
import { useParams } from "react-router";
import notifcation, { NotificationType } from "../../../utilities/helpers";

const ActivateAccountPage = () =>{
    const [loading,setLoading] =useState<boolean>();
    const params = useParams)

    const activateAccount = async() =>{
        try {
            const response = await authSvc.getRequest('/auth/activate'+params.activationToken)
            notifcation(response?.result?.message,NotificationType.SUCCESS)
        } catch (exception) {
            notifcation("Sorry, your account cannot be activated at this time. Please, try again later",NotificationType.ERROR)

        }
    } 
    return (
        <>
        {loading ? <Spin tip="Activating your account. Please hold on." indicator={<LoadingOutlined/>} size="large" ></Spin>:<></>}
        </>
    )
}

export default ActivateAccountPage;