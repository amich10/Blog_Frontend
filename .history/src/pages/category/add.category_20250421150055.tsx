import { useForm } from "react-hook-form";
import * as Yup from "yup";

const AddCategory = () =>{

    const {handleSubmit,formState:{errors,isSubmitting}} = useForm()

    const addCategorySchema= Yup.object({
        
    })

    return (
        <>
        
        </>
    )
}

export default AddCategory;
