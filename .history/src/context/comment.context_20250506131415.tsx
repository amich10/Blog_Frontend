import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React, { createContext, useEffect, useState } from 'react';
import commentSVc from '../services/comment.service';
import { useParams } from 'react-router';



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
    const {slug} = useParams<{slug:string}>()
    const [loading,setLoading] = useState<boolean>(true)
    const [comments,setComments] = useState<ICommentsType[]>([])
    const [totalComments,setTotalComments] = useState<number>(0)

    const fetchComments = async () => {
        try {
          const response = await commentSVc.getRequest("/comment/post/" + slug);
          setComments(response.result.data);
          console.log(response.result.data);
        } catch (exception) {
          console.log(exception);
        }
      };

      const fetchtotalComments = async() =>{
          try{
            const response = await commentSVc.getRequest('/comment/post/count/'+slug)
            setTotalComments(response.result.data.totalComments)
            console.log(response)
          }catch(exception){
            throw exception
          }
        }
    
    useEffect(() =>{
        
    },[])
    
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