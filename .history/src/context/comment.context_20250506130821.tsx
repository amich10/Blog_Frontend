import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React, { createContext, useState } from 'react';



type ICommentsType = {
    "_id": "681213376be16de02df7238d",
    "postId": "680883f08c489d83223164d4",
    "userId": {
        "image": {
            "url": "https://res.cloudinary.com/dkunajgg7/image/upload/v1745238601/blog-platform/users/axnfv06zopwnvjlthjck.jpg",
            "optimizedUrl": "https://res.cloudinary.com/dkunajgg7/image/upload/f_auto,q_auto/v1/blog-platform/users/axnfv06zopwnvjlthjck?_a=BAMCkGTG0"
        },
        "_id": "68063a49049d5ab1b50c3675",
        "username": "Amich"
    },
    "content": "hello",
    "createdAt": "2025-04-30T12:10:31.787Z",
    "updatedAt": "2025-04-30T12:10:31.787Z",
    "__v": 0
}

export type IChildren = {
    children: React.ReactNode;
}

interface ICommentContext {
    comments = 
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