import { Button, Layout, Typography, Upload } from "antd"
import { InputLabel, TextInputController } from "../../components/input.component"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useParams } from "react-router"
import categorySVc from "../../services/category.service"

const EditCategory = () =>{

    const [imageData,setImageData] = useState<string>()

    const {control,handleSubmit,formState:{errors,isSubmitting}} = useForm()
    const params = useParams()
    const [userData,setUserData] = useState()<>

    const getCategoryById = async() =>{
        try {
            const userData = await categorySVc.getRequest('/category/'+params.id)
            console.log()
            set
        } catch (exception) {
            
        }
    }


    return (
        <>
        <Layout.Content className="p-8 bg-white rounder-md shadow-xl ">
        <form onSubmit={handleSubmit(submitHandler)}>
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