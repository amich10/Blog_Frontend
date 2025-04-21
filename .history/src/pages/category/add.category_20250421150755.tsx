import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { type UploadProps, type UploadFile } from "antd";
import { useState } from "react";
import categorySVc from "../../services/category.service";
import notifcation from "../../utilities/helpers";

interface ICategory{
    title:string,
    status:string,
    image:string | null
}

const AddCategory = () =>{

    const {control,handleSubmit,formState:{errors,isSubmitting},setValue} = useForm()
    const [loading,setLoading] = useState<boolean>(false)

    const addCategorySchema= Yup.object({
        title:Yup.string().min(2).max(50).required(),
        status:Yup.string().required(),
        image:Yup.mixed().nullable()
    })

    const [fileList, setFileList] = useState<UploadFile[]>([]);
      const props: UploadProps = {
        onRemove: (file) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          setFileList(newFileList);
          setValue("image", null);
        },
        beforeUpload: (file) => {
          console.log("FILE SELECTED", file);
          setFileList([file]);
          setValue("image", file as any);
          return false;
        },
        fileList,
      };

      const submitHandler = async(data:ICategory) =>{
        setLoading(true)
        try {
            await categorySVc.patchRequest('/category/create',data,{file:true})
            notifcation("")
        } catch (exception) {
            
        }finally{
            setLoading(false)
        }
      }
    


    return (
        <>
        
        </>
    )
}

export default AddCategory;
