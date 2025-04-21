import { Button, Layout, Typography, Upload } from "antd"
import { InputLabel, TextInputController } from "../../components/input.component"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Navigate, useNavigate, useParams } from "react-router"
import categorySVc from "../../services/category.service"
import notifcation, { NotificationType } from "../../utilities/helpers"
import * as Yup from "yup"


interface ICategoryData {
    title:string,
    status:string,
    image?:{
        url:string,
        optimizedUrl:string
    }
}
const EditCategory = () =>{

    const [imageData,setImageData] = useState<string>()

    const params = useParams()
    const [categoryData,setCategoryData] = useState<ICategoryData>()
    const navigate = useNavigate()

    const editCategorySchema = Yup.object({
        title:Yup.string().min(2).max(50).required(),
        status:Yup.string().required(),
        image:Yup.mixed().nullable()
    })
    const {control,handleSubmit,formState:{errors,isSubmitting},setValue} = useForm({
        defaultValues:{
            title:"",
            status:"",
            image:null
        },
    })

    const getCategoryById = async() =>{
        try {
            const category = await categorySVc.getRequest('/category/'+params.id)
            setCategoryData(category.result.data)
            
        } catch (exception) {
            notifcation("Sorry category cannot be fetched now.",NotificationType.ERROR)
        }
    }

    const categoryUpdateById = async(data:any) =>{
        try {
            await categorySVc.patchRequest('/category/update/'+params.id,data,{file:true})
            notifcation("Category updated",NotificationType.SUCCESS)
            navigate('/admin/category')
        } catch (exception) {
            console.log(exception)
            notifcation("Sorry, category cannot be updated now.Please try again later",NotificationType.ERROR)

        }
    }

    useEffect (() =>{
        if(categoryData){
            setValue('title',categoryData.title)
            setValue('status',categoryData.status),
            setImageData(categoryData?.image?.optimizedUrl)
        }
    },[categoryData])

    return (
        <>
        <Layout.Content className="p-8 bg-white rounder-md shadow-xl ">
        <form onSubmit={handleSubmit(categoryUpdateById)}>
        <div className="border-b pb-4 mb-6">
          <Typography.Title
            level={2}
            className="!text-2xl font-semibold text-gray-800"
          >
            Create Category
          </Typography.Title>
        </div>
        <div>
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
            <InputLabel htmlFor="title" classses={" w-full sm:w-1/3"}>
              Title
            </InputLabel>
            <TextInputController
              classes={"w -full sm:w-2/3"}
              name="title"
              control={control}
              errorMsg={errors?.title?.message}
              type="text"
            ></TextInputController>
          </div>
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
            <InputLabel htmlFor="status" classses={" w-full sm:w-1/3"}>
              Status
            </InputLabel>
            <TextInputController
              classes={"w -full sm:w-2/3"}
              name="status"
              control={control}
              errorMsg={errors?.status?.message}
              type="text"
            ></TextInputController>
          </div>
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2 sm:mr-4">
             <div className="w-full sm:w-1/3">
             <InputLabel htmlFor="image">
                Profile Image
              </InputLabel>
             </div>
             <div className="w-full">
             <InputLabel htmlFor="image" classses={"w-full sm:w-1/3"}>
              Profile Image
            </InputLabel>
            <Upload
              {...props}
              listType="picture-card"
              showUploadList={false}
              maxCount={1}
              accept="image/*"
            >
              {imageData ? (
                <img
                  src={imageData}
                  alt="user avatar"
                  className="!w-full h-20 object-cover rounded-md"
                />
              ) : (
                <div>
                  <UploadOutlined />
                  <div>Click or drag to upload</div>
                </div>
              )}
            </Upload>

             </div>
            </div>
            <div className="text-center mt-3">
            <Button
              type="default"
              htmlType="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
              className="border-2 border-blue-600! w-40 h-9 text-[17px] text-blue-600!"
            >
              {isSubmitting ? 'Creating...' : 'Create'}
            </Button>
          </div>
        </div>
        </form>
      </Layout.Content>    
        </>
    )
}

export default EditCategory