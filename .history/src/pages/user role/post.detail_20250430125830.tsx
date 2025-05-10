import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import postSvc from '../../services/post.service';
import notifcation, { NotificationType } from '../../utilities/helpers';
import { Avatar, Button, Layout } from 'antd';
import { LikeFilled, LikeOutlined, UserOutlined } from '@ant-design/icons';
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
                    <LikeOutlined style={{ color: "#4f6f52" }} />
                  ) : (
                    <LikeFilled />
                  )
                }
                className="text-gray-600 text-sm flex items-center gap-1"
                onClick={() => {
                  if (post.likes.length > 0) {
                    notifcation("You unliked this post.", NotificationType.INFO);
                    setPost({ ...post, likes: [] });
                  } else {
                    notifcation("You liked this post.", NotificationType.INFO);
                    setPost({ ...post, likes: [{}] });
                  }
                }}
              >
                <strong>{post.likes.length}</strong>
              </Button>
              <span className="text-gray-600 text-sm">
                Views: <strong>{post.views}</strong>
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
        <div className="w-1/4 h-full px-8 py-6">
          <section className="mb-6">
            <h2 className="font-semibold text-lg mb-2 text-[#4f6f52]">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-white border border-[#4f6f52] text-sm px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
          <section className="mb-6">
            <h2 className="font-semibold text-lg mb-2 text-[#4f6f52]">Category</h2>
            <p className="text-gray-700">{post.categoryId}</p>
          </section>
          <section className="mb-6">
            <h2 className="font-semibold text-lg mb-2 text-[#4f6f52]" >Statistics</h2>
            <ul className="text-gray-700">
              <li>Views: {post.views}</li>
              <li>Likes: {post.likes.length}</li>
              <li>Comments: {post.commentsCount}</li>
            </ul>
          </section>
        </div>
      </div>
    </Layout.Content>
  );
};

export default PostDetail;
