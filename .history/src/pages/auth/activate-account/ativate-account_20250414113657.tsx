import { useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

const ActivateAccountPage = () =>{
    const [loading,setLoading] =useState<boolean>();

    const activateAccount = async(url:string,config:any={}) =>{
        try {
            await
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