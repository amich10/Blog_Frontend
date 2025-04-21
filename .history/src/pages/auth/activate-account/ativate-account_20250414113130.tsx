import { useState } from "react";


const ActivateAccountPage = () =>{
    const [loading,setLoading] =useState<boolean>();
    return (
        <>
        {loading ? <Spin ></Spin>:<></>}
        </>
    )
}

export default ActivateAccountPage;