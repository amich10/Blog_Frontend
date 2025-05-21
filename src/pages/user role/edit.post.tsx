import { Button, Layout, Upload, ConfigProvider } from "antd";
import {
  InputLabel,
  SelectInputController,
  TagsInputController,
  TextAreaController,
  TextInputController,
} from "../../components/input.component";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { type UploadProps, type UploadFile } from "antd";
import { useCategory } from "../../context/category.context";
import postSvc from "../../services/post.service";
import notifcation, { NotificationType } from "../../utilities/helpers";
import { useNavigate, useParams } from "react-router";
import { IPost } from "../admin/posts/edit.post";
import { UploadOutlined } from "@ant-design/icons";

const EditBlog = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [postData, setPostData] = useState<IPost>();
  const navigate = useNavigate();
  const { data } = useCategory();
  const [imageData, setImageData] = useState<string>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const editPostSchema = Yup.object({
    title: Yup.string().min(2).max(250).required(),
    categoryId: Yup.string().required(),
    content: Yup.string().min(10).max(5000).required(),
    image: Yup.mixed().nullable(),
    tags: Yup.array().of(Yup.string()).required(),
  });

  const props: UploadProps = {
    onRemove: () => {
      setFileList([]);
      setImageData(undefined);
      setValue("image", null);
    },
    beforeUpload: (file) => {
      setFileList([file]);
      setValue("image", file as any);
      const reader = new FileReader();
      reader.onload = () => setImageData(reader.result as string);
      reader.readAsDataURL(file);
      return false;
    },
    fileList,
  };

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      categoryId: "",
      image: null,
      tags: [],
    },
    resolver: yupResolver(editPostSchema),
  });

  const getPostById = async () => {
    setLoading(true);
    try {
      const response = await postSvc.getRequest("/post/" + slug);
      console.log(response.result.data);
      setPostData(response.result.data);
    } catch (error) {
      console.log(error);
      notifcation("Failed to fetch post data", NotificationType.ERROR);
    } finally {
      setLoading(false);
    }
  };
  const updatePostById = async (formData: any) => {
    setLoading(true);
    try {
      await postSvc.patchRequest("/post/update/" + slug, formData, {
        file: true,
      });
      notifcation("Post updated successfully", NotificationType.SUCCESS);
      navigate("/blogs/my-profile");
    } catch (error) {
      console.log(error);
      notifcation(
        "Sorry, post cannot be updated now. Please, try again later",
        NotificationType.ERROR
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPostById();
  }, []);

  useEffect(() => {
    if (postData) {
      setValue("title", postData.title);
      setValue("content", postData.content);
      setValue("tags", postData.tags);
      setValue("categoryId", postData.categoryId);
      setImageData(postData?.images?.[0]?.optimizedUrl);
    }
  }, [postData, setValue]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#4f6f52",
          borderRadius: 5,
          colorBgContainer: "white",
        },
      }}
    >
      <Layout.Content className="bg-white">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100">
            <h1 className="text-2xl font-bold text-[#4f6f52]">Edit Post</h1>
          </div>

          {/* Form */}
          <form
            className="px-8 py-6 space-y-6"
            onSubmit={handleSubmit(updatePostById)}
          >
            {/* Title */}
            <div>
              <InputLabel htmlFor="title">Blog Title</InputLabel>
              <TextInputController
                type="text"
                control={control}
                name="title"
                placeholder="Enter your blog title"
                classes="px-3! py-2! border border-gray-300 rounded-lg focus:outline-none focus:border-green-800 transition-all"
              />
            </div>

            {/* Category & Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <InputLabel htmlFor="category">Select a Category</InputLabel>
                <SelectInputController
                  control={control}
                  name="categoryId"
                  classes="w-full h-10! border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition-all"
                  options={data?.map((category) => ({
                    label: category.title,
                    value: category._id,
                  }))}
                />
              </div>

              {/* Upload Image */}
              <div className="">
                <div>
                  <InputLabel htmlFor="image"> Image</InputLabel>
                </div>
                <div>
                  <Upload
                    {...props}
                    listType="picture-card"
                    showUploadList={false}
                    maxCount={1}
                    accept="image/*"
                    action=""
                  >
                    {imageData ? (
                      <div>
                        <img src={imageData} alt="preview" />
                        <div className="text-center mt-1 text-blue-500! text-sm">
                          Change Image
                        </div>
                      </div>
                    ) : (
                      <div>
                        <UploadOutlined />
                        <div>Click or drag to upload</div>
                      </div>
                    )}
                  </Upload>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <InputLabel htmlFor="content">Content</InputLabel>
              <TextAreaController
                autoSize={{ minRows: 10 }}
                control={control}
                name="content"
                placeholder="Write your blog content here..."
                errorMsg={errors?.content?.message}
                classes="border border-gray-300 rounded-lg focus:outline-none focus:border-green-800 transition-all"
              />
            </div>

            <div>
              <InputLabel htmlFor="tags" classses="w-full sm:w-1/3">
                Tags
              </InputLabel>
              <TagsInputController
                name="tags"
                control={control}
                errorMsg={errors?.tags?.message}
                placeholder="add tags to your posts"
                classes={"w-full"}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end mt-4 gap-4">
              <Button
                type="default"
                onClick={() => {
                  reset();
                  setFileList([]);
                  setImageData(undefined);
                }}
              >
                Reset
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-[#4f6f52]!"
                disabled={isSubmitting || loading}
                loading={isSubmitting || loading}
              >
                {isSubmitting || loading ? "Creating..." : "Edit"}
              </Button>
            </div>
          </form>
        </div>
      </Layout.Content>
    </ConfigProvider>
  );
};

export default EditBlog;
