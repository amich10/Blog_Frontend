import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { type UploadProps, type UploadFile } from "antd";
import { useState } from "react";

const AddCategory = () =>{

    const {control,handleSubmit,formState:{errors,isSubmitting},setValue} = useForm()

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
        try {
            
        } catch (exception) {
            
        }
      }
    


    return (
        <>
        
        </>
    )
}

export default AddCategory;
