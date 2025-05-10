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
    comments: ICommentsType[];
}
const CommentContext = createContext(undefined)


export const CommentProvider = ({children}:IChildren) =>{
    const [loading,setLoading] = useState<boolean>(true)
    const [comments,setComments] = useState<ICommentsType[]>([])
    const [totalComments,setTotalComments] = useState<number>(0)

    const listComments = async()


    
    return (
        <>
        <CommentContext.Provider value={
            comments
        }>
            {loading ? <Spin tip="Loading" indicator={<LoadingOutlined/>}/> :children}
        </CommentContext.Provider>
        </>
    )
}