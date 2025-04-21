import { Layout, Typography } from "antd"
import { InputLabel, TextInputController } from "../../components/input.component"

const EditCategory = () =>{


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
             <Up {...props}>
                <Button icon={<PiUploadLight />}>
                  Select Image
                </Button>
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