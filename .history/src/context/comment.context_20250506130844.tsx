import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React, { createContext, useState } from 'react';



interface ICommentsType {
    _id: string;
    postId: string;
    userId: {
        image: {
            url: string;
            optimizedUrl: string;
        };
        _id: string;
        username: string;
    };
    content: string;
    createdAt: string;
    updatedAt: string;
}

export type IChildren = {
    children: React.ReactNode;
}

interface ICommentContext {
    comments:
}
const CommentContext = createContext(undefined)


export const CommentProvider = ({children}:IChildren) =>{
    const [loading,setLoading] = useState<boolean>(true)
    return (
        <>
        <CommentContext.Provider value={

        }>
            {loading ? <Spin tip="Loading" indicator={<LoadingOutlined/>}/> :children}
        </CommentContext.Provider>
        </>
    )
}