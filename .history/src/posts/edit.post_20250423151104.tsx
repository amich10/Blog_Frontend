import { useNavigate, useParams } from "react-router";
import postSvc from "../services/post.service";
import notifcation, { NotificationType } from "../utilities/helpers";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Layout,
  Typography,
  Upload,
  type UploadFile,
  type UploadProps,
} from "antd";
import {
  InputLabel,
  SelectInputController,
  TextAreaController,
  TextInputController,
} from "../components/input.component";
import { useCategory } from "../context/category context/category.context";
import { UploadOutlined } from "@ant-design/icons";

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
  images: [
    {
      url: string;
      optimizedUrl: string;
    }
  ];
  updatedBy: string | null;
  excerpt: string;
  createdAt: string;
  updatedAt: string;
}

const EditPost = () => {
  const params = useParams();
  const [postData, setPostData] = useState<IPost>();
  const [imageData, setImageData] = useState<string>();
  const navigate = useNavigate();
  const {data} = use

 
  const editPostSchema = Yup.object({
    title: Yup.string().min(2).max(250).required(),
    content: Yup.string().min(10).required(),
    tags: Yup.array().of(Yup.string().max(20)).required(),
    categoryId: Yup.string().required(),
    status: Yup.string().required(),
    images: Yup.mixed().nullable(),
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,reset
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      tags: [],
      categoryId: "",
      status: "",
      images: null,
    },
    resolver: yupResolver(editPostSchema),
  });


  const [fileList, setFileList] = useState<UploadFile[]>([]);  
  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
      setValue("images", null); // Reset image value in the form
    },
    beforeUpload: (file) => {
      console.log("FILE SELECTED", file);
      setFileList([file]); // Set file list to the selected file
      setValue("images", file as any); // Set file in the form value
      const reader = new FileReader();
      reader.onload = () => setImageData(reader.result as string); // Update image preview
      reader.readAsDataURL(file);
      return false; // Prevent default upload behavior
    },
    fileList,
  };
  const getPostById = async () => {
    try {
      const response = await postSvc.getRequest("/post/" + params.id);
      console.log(response);
      setPostData(response.result.data);
    } catch (exception) {
      throw exception;
    }
  };

  const updatePostById = async (data: any) => {
    try {
        await postSvc.patchRequest("/post/update/" + params.id, data, {file: true});
      notifcation("Post updated successfully", NotificationType.SUCCESS);
    } catch (exception) {
      console.log(exception);
      notifcation(
        "Sorry, post cannot be updated now. Please, try again later",
        NotificationType.ERROR
      );
    }
  };

  //when the component is rendered for the first time getPostByid is runned
  useEffect(() => {
    getPostById();
  }, []);

  useEffect(() => {
    if (postData) {
      setValue("title", postData.title);
      setValue("content", postData.content);
      setValue("tags", postData.tags);
      setValue("categoryId", postData.categoryId);
      setValue("status", postData.status);
      setImageData(postData?.images[0]?.optimizedUrl);
    }
  }, [postData, setValue]);

  return (
    <>
      <Layout.Content className="bg-white p-8 rounded-md shadow-md">
        <form onSubmit={handleSubmit(updatePostById)}>
          <div className="border-b pb-4 mb-6">
            <Typography.Title
              level={2}
              className="!mb-0 !text-2xl font-semibold text-gray-800"
            >
              Edit Post
            </Typography.Title>
          </div>
          <div>
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
              <InputLabel htmlFor="title" classses={"w-full sm:w-1/3"}>
                Title
              </InputLabel>
              <TextInputController
                classes={"w-full sm:w-2/3"}
                name="title"
                control={control}
                errorMsg={errors?.title?.message}
                placeholder="Full name"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
              <InputLabel htmlFor="categoryId" classses={"w-full sm:w-1/3"}>
                Select Category
              </InputLabel>
              <SelectInputController
                options={data?.map((cat) => ({
                  label: cat.title,
                  value: cat._id,
                }))}
                name="categoryId"
                control={control}
                errorMsg={errors?.categoryId?.message}
                classes={"w-full sm:w-2/3"}
                placeholder="Select role"
              />
            </div>

            <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
              <InputLabel htmlFor="status" classses={"w-full sm:w-1/3"}>
                Status
              </InputLabel>
              <SelectInputController
                options={[
                  { label: "published", value: "published" },
                  { label: "unpublished", value: "unpublished" },
                ]}
                name="status"
                control={control}
                errorMsg={errors?.status?.message}
                classes={"w-full sm:w-2/3"}
                placeholder="Select status"
              />
            </div>

            <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2 sm:mr-4">
              <InputLabel htmlFor="content" classses={"w-full sm:w-1/3"}>
                Content
              </InputLabel>
              <TextAreaController
                classes={"w-full sm:w-2/3"}
                name="content"
                control={control}
                autoSize={{ minRows: 15 }}
                errorMsg={errors?.content?.message}
                placeholder="Short bio here"
              />
            </div>

            <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-4">
              <InputLabel htmlFor="image" classses={"w-full sm:w-1/3"}>
                Image
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

          <div className="mt-6 flex justify-end gap-4">
            <Button type="default" onClick={() => reset()}>
              Reset
            </Button>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Layout.Content>
    </>
  );
};
export default EditPost;
