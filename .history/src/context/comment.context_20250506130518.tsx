import { Spin } from 'antd';
import React, { createContext, useState } from 'react';

export type IChildren = {
    children: React.ReactNode;
}

const CommentContext = createContext(undefined)


export const CommentProvider = ({children}:IChildren) =>{
    const [loading,setLoading] = useState<boolean>(true)
    return (
        <>
        <CommentContext.Provider>
            {loading} ? <Spin
        </CommentContext.Provider>
        </>
    )
}