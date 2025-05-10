import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

type BlogPost = {
  title: string;
  content: string;
  author: string;
  createdAt: string;
  image?: string;
};

const PostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await (`/post/${slug}`);
        setPost(data);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!post) return <p>No blog post found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 text-sm mb-2">
        By {post.author} on {new Date(post.createdAt).toLocaleDateString()}
      </p>
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-auto rounded-md mb-4"
        />
      )}
      <div
        className="prose prose-lg"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};

export default PostDetail;
