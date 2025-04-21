import { useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

const ActivateAccountPage = () =>{
    const [loading,setLoading] =useState<boolean>();
    return (
        <>
        {loading ? <Spin spinning={LoadingOutlined} ></Spin>:<></>}
        </>
    )
}

export default ActivateAccountPage;