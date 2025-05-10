import { useParams } from 'react-router';



const PostDetail = () => {
    const { slug } = useParams<{ slug: string }>();

    return (
        <>
            <h1>Post Detail</h1>
            <p>Slug: {slug}</p>
        </>
    );
};

export default PostDetail;