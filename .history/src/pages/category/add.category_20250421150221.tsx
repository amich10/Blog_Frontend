import { useForm } from "react-hook-form";
import * as Yup from "yup";

const AddCategory = () =>{

    const {handleSubmit,formState:{errors,isSubmitting}} = useForm()

    const addCategorySchema= Yup.object({
        title:Yup.string().min(2).max(50).required(),
        status:Yup.string().required(),
        image:Yup.mixed().nullable()
    })

    return (
        <>
        
        </>
    )
}

export default AddCategory;
