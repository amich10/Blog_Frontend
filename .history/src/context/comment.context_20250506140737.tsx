
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React, { createContext, useContext, useEffect, useState } from 'react';
import commentSVc from '../services/comment.service';

interface User {
  _id: string;
  username: string;
  image?: {
    url: string;
    optimizedUrl: string;
  };
}

interface Comment {
  _id: string;
  postId: string;
  userId: User;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface CommentCountResponse {
  totalComments: number;
}

interface ICommentContext {
  comments: Comment[];
  totalComments: number;
  fetchComments: (slug: string) => Promise<void>;
  fetchCommentsCount: (slug: string) => Promise<void>;
  loading: boolean;
}

const CommentContext = createContext<ICommentContext | undefined>(undefined);

interface ICommentProviderProps {
  children: React.ReactNode;
}

export const CommentProvider: React.FC<ICommentProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [totalComments, setTotalComments] = useState<number>(0);

  const fetchComments = async (slug: string) => {
    setLoading(true);
    try {
      const response = await commentSVc.getRequest<{ data: Comment[] }>(`/comment/post/${slug}`);
      setComments(response.result.data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCommentsCount = async (slug: string) => {
    try {
      const response = await commentSVc.getRequest<{ data: CommentCountResponse }>(
        `/comment/post/count/${slug}`
      );
      setTotalComments(response.result.data?.totalComments || 0);
    } catch (error) {
      console.error('Error fetching comment count:', error);
      setTotalComments(0);
    }
  };

  return (
    <CommentContext.Provider
      value={{
        comments,
        totalComments,
        fetchComments,
        fetchCommentsCount,
        loading,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export const useComments = (): ICommentContext => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error('useComments must be used within a CommentProvider');
  }
  return context;
};