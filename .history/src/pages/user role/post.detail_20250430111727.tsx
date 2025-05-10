import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import postSvc from '../../services/post.service';
import notifcation, { NotificationType } from '../../utilities/helpers';
import { Layout } from 'antd';

type BlogPost = {
    authorId
    : 
    "68063a49049d5ab1b50c3675"
    categoryId
    : 
    "6810b75ba96f9b2774e0db25"
    commentsCount
    : 
    0
    content
    : 
    "Artificial Intelligence is rapidly reshaping the educational landscape, offering tools and insights that were once unimaginable. Personalized learning powered by AI allows educators to tailor content to individual student needs, adapting to their pace and style of learning. Intelligent tutoring systems and adaptive platforms can assess a learner’s strengths and weaknesses in real-time, providing instant feedback and targeted support. This shift from a one-size-fits-all model to a more personalized approach has the potential to improve student outcomes across all levels of education.\r\n\r\nBeyond personalization, AI is streamlining administrative tasks for teachers and institutions. Automated grading systems, plagiarism detection, and scheduling tools reduce the burden of routine tasks, allowing educators to focus more on teaching and student engagement. AI-powered analytics also help schools identify at-risk students earlier, enabling timely interventions and support. With these advancements, educators can make more informed decisions, improving both classroom efficiency and the overall learning experience.\r\n\r\nHowever, the rise of AI in education also brings challenges. Ethical concerns around data privacy, algorithmic bias, and over-reliance on technology must be addressed to ensure equitable and transparent use. Furthermore, access to AI tools is not uniform, which can widen the digital divide. As AI becomes more embedded in education, collaboration between policymakers, technologists, and educators will be essential to harness its benefits while minimizing its risks—ensuring that AI serves as a bridge to greater learning opportunities, not a barrier."
    createdAt
    : 
    "2025-04-29T12:09:21.708Z"
    excerpt
    : 
    "Artificial Intelligence is rapidly reshaping the educational landscape, offering tools and insights that were once unimaginable. Personalized learning"
    images
    : 
    [{…}]
    likes
    : 
    []
    publishedAt
    : 
    null
    slug
    : 
    "ai-in-education:-transforming-classrooms-and-unlocking-potential"
    status
    : 
    "unpublished"
    tags
    : 
    []
    title
    : 
    "AI in Education: Transforming Classrooms and Unlocking Potential"
    updatedAt
    : 
    "2025-04-29T12:09:21.708Z"
    updatedBy
    : 
    null
    views
    : 
    0
    __v
    : 
    0
    _id
    : 
    "6810c171a96f9b2774e0de9d"
};

const PostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
    <Layout.Content className='bg-white'>
    <div className='h-screen flex'>
        {/* left side */}
        <div className='w-3/4 h-full border-r border-gray-100 px-6 py-4 flex justify-center'>
           <h1 className='font-bold text-2xl'>{post.title}</h1>

        </div>
        {/* right side */}
        <div className='w-1/4 h-full px-6 py-4'>
            right side
        </div>
    </div>
    </Layout.Content>
  );
};

export default PostDetail;
