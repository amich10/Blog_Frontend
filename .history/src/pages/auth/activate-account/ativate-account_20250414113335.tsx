import { useState } from "react";
import { Spin } from "antd";
import {loadingOutlined}

const ActivateAccountPage = () =>{
    const [loading,setLoading] =useState<boolean>();
    return (
        <>
        {loading ? <Spin ></Spin>:<></>}
        </>
    )
}

export default ActivateAccountPage;