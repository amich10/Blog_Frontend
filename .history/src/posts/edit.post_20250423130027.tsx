import { useParams } from "react-router"
import postSvc from "../services/post.service"
import notifcation, { NotificationType } from "../utilities/helpers"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";





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

    const {control,handleSubmit,formState:{errors,isSubmitting},setValue} = useForm()

    const params = useParams()
    const[postData,setPostData] = useState<IPost>()

    const getPostById = async() =>{
        try {
            const response = await postSvc.getRequest('/post'+params.id)
            setPostData(response.result.data)
        } catch (exception) {
            throw exception
        }
    }

    const updatePostById = async(data:IPost) =>{
        try {
            await postSvc.patchRequest('/post/update'+params.id, data, {file:true})
            notifcation("Post updated successfully",NotificationType.SUCCESS)
        } catch (exception) {
            notifcation("Sorry, post cannot be updated now. Please, try again later",NotificationType.ERROR)
        }
    }

    //when the component is rendered for the first time getPostByid is runned 
    useEffect(() =>{
       getPostById() 
    },[])

    useEffect(() => {
        if (postData) {
            setValue('title', postData.title);
            setValue('content', postData.content);
            setValue('tags', postData.tags);
            setValue('categoryId', postData.categoryId);
            setValue('status', postData.status);
            setValue('views', postData.views);
            setValue('likes', postData.likes);
            setValue('commentsCount', postData.commentsCount);
            setValue('publishedAt', postData.publishedAt);
            setValue('images', postData.images);
            setValue('updatedBy', postData.updatedBy);
            setValue('excerpt', postData.excerpt);
            setValue('createdAt', postData.createdAt);
            setValue('updatedAt', postData.updatedAt);
        }
    }, [postData]);

return (
    <>
 
    </>
)
}
export default EditPost