import { useState } from "react";
import { Spin } from "antd";


const ActivateAccountPage = () =>{
    const [loading,setLoading] =useState<boolean>();
    return (
        <>
        {loading ? <Spin ></Spin>:<></>}
        </>
    )
}

export default ActivateAccountPage;