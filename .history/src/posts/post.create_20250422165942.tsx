import { Layout, Typography, Upload, Button, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { type UploadProps, type UploadFile } from "antd";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import notifcation, { NotificationType } from "../utilities/helpers";
import postSvc from "../services/post.service";
import {
  InputLabel,
  SelectInputController,
  TextAreaController,
  TextInputController,
} from "../components/input.component";
import { useCategory } from "../context/category context/category.context";

const CreatePost = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const { data } = useCategory();

  const CreatePostSchema = Yup.object({
    title: Yup.string().min(2).max(50).required("Title is required"),
    categoryId: Yup.string().required("Category is required"),
    content: Yup.string().max(5000),
    image: Yup.mixed().nullable(),
    status: Yup.string().required("Status is required"),
    tags: Yup.array().of(Yup.string()).required("Tags are required"),
  }).unknown(false);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = useForm({
    defaultValues: {
      title: "",
      categoryId: "",
      content: "",
      image: null,
      tags: [],
      status: "",
    },
    resolver: yupResolver(CreatePostSchema),
  });

  const uploadProps: UploadProps = {
    multiple: true,
    onRemove: (file) => {
      const newFileList = fileList.filter((f) => f.uid !== file.uid);
      setFileList(newFileList);
      setValue("image", newFileList);
    },
    beforeUpload: (file) => {
      const newFiles = [...fileList, file];
      setFileList(newFiles);
      setValue("image", newFiles);
      return false; // prevent auto-upload
    },
    fileList,
  };

  const submitHandler = async (data: any) => {
    setLoading(true);
    try {
        console.log(data)
      await postSvc.postRequest("/post/create", data, { file: true });
      notifcation("New post created", NotificationType.SUCCESS);
      navigate("/admin/posts");
    } catch (exception) {
      notifcation("Post cannot be created now", NotificationType.ERROR);
    } finally {
      setLoading(false);
    }
  };
useEffect (() =>{

},[])
  return (
    <Layout.Content className="bg-white p-8 rounded-md shadow-md">
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="border-b pb-4 mb-6">
          <Typography.Title
            level={2}
            className="!mb-0 !text-2xl font-semibold text-gray-800"
          >
            Create new Post
          </Typography.Title>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
          <InputLabel htmlFor="title" classses="w-full sm:w-1/3">
            Title
          </InputLabel>
          <TextInputController
            classes="w-full sm:w-2/3"
            name="title"
            control={control}
            errorMsg={errors?.title?.message}
            placeholder="Your post's title"
            type="text"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
          <InputLabel htmlFor="categoryId" classses="w-full sm:w-1/3">
            Select Category
          </InputLabel>
          <SelectInputController
            options={
              data?.map((cat) => ({
                label: cat.title,
                value: cat._id,
              })) || []
            }
            name="categoryId"
            control={control}
            errorMsg={errors?.categoryId?.message}
            classes="w-full sm:w-2/3"
            placeholder="Select a category"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
          <InputLabel htmlFor="content" classses="w-full sm:w-1/3">
            Content
          </InputLabel>
          <TextAreaController
            classes="max-w-full sm:w-2/3"
            name="content"
            control={control}
            errorMsg={errors?.content?.message}
            placeholder="Write your post content..."
          />
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
          <InputLabel htmlFor="status" classses="w-full sm:w-1/3">
            Status
          </InputLabel>
          <SelectInputController
            options={[
              { label: "Published", value: "published" },
              { label: "Unpublished", value: "unpublished" },
            ]}
            name="status"
            control={control}
            errorMsg={errors?.status?.message}
            classes="w-full sm:w-2/3"
            placeholder="Select post status"
          />
        </div>

        {/* Tags */}
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
          <InputLabel htmlFor="tags" classses="w-full sm:w-1/3">
            Tags
          </InputLabel>
          <div className="w-full sm:w-2/3">
            <Controller
              control={control}
              name="tags"
              render={({ field }) => (
                <Select
                  mode="tags"
                  placeholder="Add tags"
                  style={{ width: "100%" }}
                  {...field}
                />
              )}
            />
            {errors?.tags && (
              <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>
            )}
          </div>
        </div>

        {/* Image Upload */}
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
          <div className="w-full sm:w-1/3">
            <InputLabel htmlFor="image">Post Images</InputLabel>
          </div>
          <div className="w-full sm:w-2/3">
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Select Images</Button>
            </Upload>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-4">
          <Button
            type="default"
            htmlType="submit"
            loading={isSubmitting || loading}
            disabled={isSubmitting}
            className="border-2 border-blue-600 w-40 h-9 text-[17px] text-blue-600"
          >
            {isSubmitting || loading ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </Layout.Content>
  );
};

export default CreatePost;
