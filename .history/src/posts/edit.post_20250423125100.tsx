import { useParams } from "react-router"
import postSvc from "../services/post.service"
import notifcation from "../utilities/helpers"
import { useState } from "react"





interface Post {
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
    __v: number;
}

const EditPost = () =>{



    const params = useParams()
    const[postDetail,setPostDetail] = useState<[]>()

    const getPostById = async() =>{
        try {
            const postDetail = await postSvc.getRequest('/post'+params.id)
            
        } catch (exception) {
            throw exception
        }
    }


return (
    <>
 
    </>
)
}
export default EditPost