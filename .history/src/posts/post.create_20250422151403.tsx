import { Layout, Typography, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { type UploadProps, type UploadFile } from "antd";
import { useState } from "react";
import * as Yup from "yup"
import { useNavigate } from "react-router";
import notifcation, { NotificationType } from "../utilities/helpers";
import postSvc from "../services/post.service";
import { InputLabel, PasswordInputController, SelectInputController, TextAreaController, TextInputController } from "../components/input.component";
import { useCategory } from "../context/category context/category.context";

const CreatePost = () => {

    const [_loading,setLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    const CreatePostSchema = Yup.object({
        title: Yup.string().min(2).max(50).required(),
        category: Yup.string().required(),
        content: Yup.string().max(5000),
        image: Yup.mixed().nullable(),
        status: Yup.string().required(),
        tags: Yup.array().of(Yup.string()).required(),
    });
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = useForm({
    defaultValues: {
        title:"",
        category:'',
        content:'',
        image: null,
        tags: []
    },
    resolver: yupResolver(CreatePostSchema),
  });

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

  const sumithandler = async(data: any) => {
    setLoading(true)
    try {
        await postSvc.postRequest('/post/create', data, { file: true })
        notifcation('New post created',NotificationType.SUCCESS)
        navigate("/admin/posts")

    } catch (exception) {
        notifcation("post cannot be created now",NotificationType.ERROR)
    }finally{
      setLoading(false)
    }
  };

  const category = useCategory()

  return (
    <>
      <Layout.Content className="bg-white p-8 rounded-md shadow-md">
        <form onSubmit={handleSubmit(sumithandler)}>
          <div className="border-b pb-4 mb-6">
            <Typography.Title
              level={2}
              className="!mb-0 !text-2xl font-semibold text-gray-800"
            >
              Create new Post
            </Typography.Title>
          </div>
          <div>
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
              <InputLabel htmlFor="fullName" classses={" w-full sm:w-1/3"}>
                Title
              </InputLabel>
              <TextInputController
                classes={"w -full sm:w-2/3"}
                name="fullName"
                control={control}
                errorMsg={errors?.title?.message}
                placeholder="Your post's title"
                type="text"
              ></TextInputController>
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
              <InputLabel htmlFor="gender" classses={"w-full sm:w-1/3"}>
                Select Category
              </InputLabel>
              <SelectInputController
                options={[
                  { label: "male", value: "male" },
                  { label: "female", value: "female" },
                  { label: "other", value: "other" },
                ]}
                name="gender"
                control={control}
                errorMsg={errors?.gender?.message}
                classes={"w-full sm:w-2/3"}
              />
            </div>
            

           
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
              <InputLabel htmlFor="address" classses={" w-full sm:w-1/3"}>
                Address
              </InputLabel>
              <TextInputController
                classes={"w-full sm:w-2/3"}
                name="address"
                control={control}
                errorMsg={errors?.address?.message}
                placeholder="Where do you live?"
              />
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
              <InputLabel htmlFor="role" classses={"w-full sm:w-1/3"}>
                Select a Role
              </InputLabel>
              <SelectInputController
                options={[
                  { label: "author", value: "author" },
                  { label: "reader", value: "post" },
                ]}
                name="role"
                control={control}
                errorMsg={errors?.role?.message}
                classes={"w-full sm:w-2/3"}
                placeholder="Select role"
              />
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
              <InputLabel htmlFor="gender" classses={"w-full sm:w-1/3"}>
                Select a gender
              </InputLabel>
              <SelectInputController
                options={[
                  { label: "male", value: "male" },
                  { label: "female", value: "female" },
                  { label: "other", value: "other" },
                ]}
                name="gender"
                control={control}
                errorMsg={errors?.gender?.message}
                classes={"w-full sm:w-2/3"}
              />
            </div>

            <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
              <InputLabel htmlFor="role" classses={"w-full sm:w-1/3"}>
                Status
              </InputLabel>
              <SelectInputController
                options={[
                  { label: "active", value: "active" },
                  { label: "inactive", value: "inactive" },
                ]}
                name="status"
                control={control}
                errorMsg={errors?.status?.message}
                classes={"w-full sm:w-2/3"}
                placeholder="Select role"
              />
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2 ">
              <InputLabel htmlFor="socialLinks" classses={" w-full sm:w-1/3"}>
                Social Link
              </InputLabel>
              <TextInputController
                classes={"w-full sm:w-2/3 sm:ml-1"}
                name="socialLinks"
                control={control}
                errorMsg={errors?.socialLinks?.message}
                placeholder="facebook link here..."
              />
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2 sm:mr-4">
              <InputLabel htmlFor="bio" classses={" w-full sm:w-1/3"}>
                Bio
              </InputLabel>
              <TextAreaController
                classes={" max-w-full sm:w-2/3"}
                name="bio"
                control={control}
                errorMsg={errors?.bio?.message}
                placeholder="Write what represents you."
              />
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2 sm:mr-4">
             <div className="w-full sm:w-1/3">
             <InputLabel htmlFor="image">
                Profile Image
              </InputLabel>
             </div>
             <div className="w-full">
             <Upload {...props}>
                <Button icon={<UploadOutlined />}>
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
  );
};

export default CreatePost;
