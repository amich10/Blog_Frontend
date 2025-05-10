import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React, { createContext, useContext, useEffect, useState } from 'react';
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


interface ICommentContext {
    comments: ICommentsType[];
    totalComments:number
    fetchComments:() => void;
    fetchCommentsCount:() => void;
}
const CommentContext = createContext<ICommentContext | undefined>(undefined)

interface ICommentProviderProps {
    children: React.ReactNode;
    slug: string;
  }

export const CommentProvider = ({children,slug}:ICommentProviderProps) =>{
    const [loading,setLoading] = useState<boolean>(false)
    const [comments,setComments] = useState<ICommentsType[]>([])
    const [totalComments,setTotalComments] = useState<number>(0)

    const fetchComments = async (slug:string) => {
        setLoading(true)
        try {
          const response = await commentSVc.getRequest("/comment/post/" + slug);
          setComments(response.result.data);
          console.log(response.result.data);
        } catch (exception) {
          console.log(exception);
        } finally {
            setLoading(false)
        }
      };

      const fetchCommentsCount = async() =>{

          try{
            const response = await commentSVc.getRequest('/comment/post/count/'+slug)
            console.log(slug)
            console.log(response.result.data.totalComments)
            setTotalComments(response.result.data.totalComments)
            console.log(response)
          }catch(exception){
            throw exception
          } 
          
        }
    
    useEffect(() =>{
        if(slug){
            fetchComments(slug)
            fetchCommentsCount()
        }
    },[slug])
    
    return (
        <>
        <CommentContext.Provider value={{
            comments,
            totalComments,
            fetchComments,
            fetchCommentsCount
        }
        }>
            {loading ? <Spin tip="Loading" indicator={<LoadingOutlined/>}/> :children}
        </CommentContext.Provider>
        </>
    )
}


export const useComments = () =>{
    const context = useContext(CommentContext)
    if(!context){
        throw new Error("useComments must be used within a CommentProvider")
    }
    return context
}