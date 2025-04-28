import { useParams } from "react-router"
import postSvc from "../services/post.service"
import notifcation, { NotificationType } from "../utilities/helpers"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";






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
    images:[{
        url:string,
        optimizedUrl:string
    }];
    updatedBy: string | null;
    excerpt: string;
    createdAt: string;
    updatedAt: string;
}

const EditPost = () =>{

    const params = useParams()
    const[postData,setPostData] = useState<IPost>()
    const[imageData,setImageData] = useState<string>()
    const [file,setFile]



    const editPostSchema = Yup.object({
        title: Yup.string().min(2).max(250).required(),
        content: Yup.string().min(10).required(),
        tags: Yup.array().of(Yup.string().max(20)).required(),
        categoryId: Yup.string().required(),
        status: Yup.string().required(),
        images: Yup.mixed().nullable()
    })
    const {control,handleSubmit,formState:{errors,isSubmitting},setValue} = useForm({
        defaultValues:{
            title:"",
            content:"",
            tags:[],
            categoryId:"",
            status:"",
            images:null
        },
        resolver:yupResolver(editPostSchema)
    })
    const getPostById = async () => {
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
            setImageData(postData?.images[0]?.optimizedUrl)
        }
    }, [postData,setValue]);

return (
    <>
 
    </>
)
}
export default EditPost