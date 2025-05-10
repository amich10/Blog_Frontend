import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import postSvc from '../../services/post.service';
import notifcation, { NotificationType } from '../../utilities/helpers';
import { Avatar, Button, Layout } from 'antd';
import { EyeOutlined, LikeFilled, LikeOutlined, UserOutlined } from '@ant-design/icons';
type BlogPost = {
    authorId: string;
    categoryId: string;
    commentsCount: number;
    content: string;
    createdAt: string;
    excerpt: string;
    images: Array<any>;
    likes: Array<any>;
    publishedAt: string | null;
    slug: string;
    status: string;
    tags: Array<any>;
    title: string;
    updatedAt: string;
    updatedBy: string | null;
    views: number;
};

const PostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isFollowing,setIsFollowing] = useState<boolean>()

  const fetchPost  = async() =>{
    setLoading(true)
    try {
        const response = await postSvc.getRequest(`/post/${slug}`);
        setPost(response.result.data) 
        console.log(response.result.data)
    } catch (exception:any) {
        setError(exception)
        notifcation('Sorry post cannot be fetched now.',NotificationType.ERROR)
        
    }finally{
        setLoading(false)
    }
  }

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!post) return <p>No blog post found.</p>;

  return (
    <Layout.Content className="bg-white">
      <div className="min-h-screen flex">
        {/* Left Side */}
        <div className="w-3/4 h-full border-r border-gray-200 px-8 py-2">
          <div className="p-6 rounded-lg">
            <h1 className="font-bold text-4xl mb-6 [#4f6f52]">{post.title}</h1>
            <div className="flex items-center gap-4 mb-6">
              <Avatar size="large" icon={<UserOutlined />} />
              <div className="flex flex-col">
                <span className="font-semibold text-md">Author: {post.authorId}</span>
                <span className="text-gray-500 text-sm">
                  Published on {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
              <Button
                type="primary"
                shape="round"
                className="ml-auto! bg-[#4f6f52]! "
                onClick={() => {
                  setIsFollowing(!isFollowing);
                  notifcation(
                    isFollowing
                      ? "You have unfollowed the author."
                      : "You are now following the author.",
                    NotificationType.INFO
                  );
                }}
              >
                {isFollowing ? "following" : "follow"}
              </Button>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-white font-bold bg-[#4f6f52] py-1 px-3 rounded-lg">
               {post.categoryId}
              </span>
              <Button
                type="text"
                icon={
                  post.likes.length > 0 ? (
                    <LikeFilled  className='text-[#4f6f52]!'/>
                  ) : (
                    <LikeOutlined/>
                  )
                }
                className="text-gray-600 text-sm flex items-center gap-1"
                onClick={() => {
                  if (post.likes.length > 0) {
                    setPost({ ...post, likes: post.likes.filter(() => false) });
                  } else {
                    setPost({ ...post, likes: [...post.likes, {}] });
                  }
                }}
              >
                {post.likes.length}
              </Button>
              <span className=" text-sm flex items-center gap-2">
                <EyeOutlined className="text-[#4f6f52]" />
               {post.views}
              </span>
            </div>
            <div className="mb-6">
              {post.images.length > 0 && (
                <img
                  src={post.images[0]?.optimizedUrl}
                  alt={post.title}
                  className="w-full h-auto max-h-96 object-cover rounded-md shadow-md"
                />
              )}
            </div>
            <div className="text-gray-800 leading-relaxed">
              <p>{post.content}</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-1/4 h-full px-8 py-6 sticky top-0">
        <section className="space-y-8">
            {/* Comments Section */}
            <div>
                <h2 className="font-semibold text-white mb-3 bg-[#4f6f52] py-1 px-3 rounded-lg w-full text-center">
                    Comments <span className="text-white">({post.commentsCount})</span>
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg shadow">
                    <h3 className="font-semibold text-lg mb-3">Leave a Comment</h3>
                    <div className="mb-3">
                        <textarea
                            rows={3}
                            placeholder="Share your thoughts..."
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f6f52] resize-none"
                        />
                    </div>
                    <Button type="primary" className="bg-[#4f6f52] w-full" block>
                        Submit
                    </Button>
                </div>
                <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-3">All Comments</h3>
                    {Array.isArray((post as any).comments) && (post as any).comments.length > 0 ? (
                        <ul className="space-y-4 max-h-64 overflow-y-auto pr-2">
                            {(post as any).comments.map((comment: any, idx: number) => (
                                <li key={idx} className="bg-white p-3 rounded-lg shadow flex flex-col">
                                    <div className="flex items-center gap-3 mb-1">
                                        <Avatar size="small" icon={<UserOutlined />} />
                                        <span className="font-semibold">{comment.author || "Anonymous"}</span>
                                        <span className="text-gray-400 text-xs ml-auto">
                                            {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : ""}
                                        </span>
                                    </div>
                                    <p className="text-gray-700">{comment.content}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400 text-center">No comments yet. Be the first to comment!</p>
                    )}
                </div>
            </div>
            {/* Tags Section */}
            <div>
                <h2 className="font-semibold text-white mb-3 bg-[#4f6f52] py-1 px-3 rounded-lg w-full text-center">
                    Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                    {post.tags && post.tags.length > 0 ? (
                        post.tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="bg-white border border-[#4f6f52] text-[#4f6f52] text-xs px-3 py-1 rounded-full shadow-sm"
                            >
                                {typeof tag === "string" ? tag : tag.name || ""}
                            </span>
                        ))
                    ) : (
                        <span className="text-gray-400">No tags</span>
                    )}
                </div>
            </div>
        </section>
        </div>
      </div>
    </Layout.Content>
  );
};

export default PostDetail;
