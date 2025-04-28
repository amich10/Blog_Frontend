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



    const {control,handleSubmit,formState:{errors,isSubmitting},setValue} = useForm()

    const params = useParams()
    const[postData,setPostData] = useState<IPost>()
    const[imageData,setImageData] = useState<string>()



    
      const editUserSchema = Yup.object({
        fullName: Yup.string()
          .min(2, "Full Name must be at least 2 characters")
          .max(50, "Full Name cannot exceed 50 characters")
          .required("Full Name is required"),
        username: Yup.string()
          .min(2, "Username must be at least 2 characters")
          .max(50, "Username cannot exceed 50 characters")
          .required("Username is required"),
        email: Yup.string()
          .email("Invalid email format")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        address: Yup.string()
          .max(100, "Address cannot exceed 100 characters")
          .required("Address is required"),
        role: Yup.string().required(),
        status: Yup.string().required(),
        gender: Yup.string().required(),
        phone: Yup.string()
          .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
          .required("Phone number is required"),
        bio: Yup.string().max(200, "Bio cannot exceed 200 characters"),
        image: Yup.mixed().nullable(),
        soci










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
            setImageData(postData?.images[0]?.optimizedUrl)
        }
    }, [postData,setValue]);

return (
    <>
 
    </>
)
}
export default EditPost