import { useParams } from "react-router"
import postSvc from "../services/post.service"
import notifcation from "../utilities/helpers"
import { useState } from "react"





interface IPost {
    _id: string;
    title: string;
    slug: string;
    content: string;
    tags: string[];
    categoryId: string;
    authorId: string;
    status: string;
    views: number;
    likes: string[];
    commentsCount: number;
    publishedAt: string;
    images: string[];
    updatedBy: string | null;
    excerpt: string;
    createdAt: string;
    updatedAt: string;
}

const EditPost = () =>{



    const params = useParams()
    const[postDetail,setPostDetail] = useState<IPost>()

    const getPostById = async() =>{
        try {
            const response = await postSvc.getRequest('/post'+params.id)
            setPostDetail(response.result.data)
        } catch (exception) {
            throw exception
        }
    }

    const updatePostById = asncy() =>{
        try {
            
        } catch (exception) {
            
        }
    }


return (
    <>
 
    </>
)
}
export default EditPost