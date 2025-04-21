import { useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

const ActivateAccountPage = () =>{
    const [loading,setLoading] =useState<boolean>();
    return (
        <>
        {loading ? <Spin indicator={<LoadingOutlined/>} size="medium" ></Spin>:<></>}
        </>
    )
}

export default ActivateAccountPage;