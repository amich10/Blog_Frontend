import { useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

const ActivateAccountPage = () =>{
    const [loading,setLoading] =useState<boolean>();
    return (
        <>
        {loading ? <Spin indicator={<>>} ></Spin>:<></>}
        </>
    )
}

export default ActivateAccountPage;