import { useState } from "react";


const ActivateAccountPage = () =>{
    const [loading,setLoading] =useState<boolean>();
    return (
        <>
        {loading ? <Spin full></Spin>}
        </>
    )
}

export default ActivateAccountPage;