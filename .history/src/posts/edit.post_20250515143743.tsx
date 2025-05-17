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
import { UploadOutlined } from "@ant-design/icons";
import { useCategory } from "../context/category.context";
import { useAuth } from "../context/auth.context";

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
  const { slug } = useParams();
  const navigate = useNavigate();
  const [postData, setPostData] = useState<IPost>();
  const [imageData, setImageData] = useState<string>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { data: categories } = useCategory()

  const editPostSchema = Yup.object({
    title: Yup.string().min(2).max(250).required("Title is required"),
    content: Yup.string().min(10).required("Content is required"),
    tags: Yup.array().of(Yup.string().max(20)).required("Tags are required"),
    categoryId: Yup.string().required("Category is required"),
    status: Yup.string().required("Status is required"),
    image: Yup.mixed().nullable(),
  });


  const {userDetails} = useAuth()
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      tags: [],
      categoryId: "",
      status: "",
      image: null, 
    },
    resolver: yupResolver(editPostSchema),
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

  const getPostById = async () => {
    try {
      const response = await postSvc.getRequest("/post/" + slug);
      setPostData(response.result.data);
    } catch (error) {
      notifcation("Failed to fetch post data", NotificationType.ERROR);
    }
  };

  const updatePostById = async (formData: any) => {
    try {
      await postSvc.patchRequest("/post/update/" + slug, formData, {
        file: true,
      });
      notifcation("Post updated successfully", NotificationType.SUCCESS);
      navigate("/admin/posts");
    } catch (error) {
      console.log(error);
      notifcation(
        "Sorry, post cannot be updated now. Please, try again later",
        NotificationType.ERROR
      );
    }
  };

  useEffect(() => {
    if(userDetails)
    getPostById();
  }, []);

  useEffect(() => {
    if (postData) {
      setValue("title", postData.title);
      setValue("content", postData.content);
      setValue("tags", postData.tags);
      setValue("categoryId", postData.categoryId);
      setValue("status", postData.status);
      setImageData(postData?.images?.[0]?.optimizedUrl);
    }
  }, [postData, setValue]);

  return (
    <Layout.Content className="bg-white p-8 rounded-md shadow-md">
      <form onSubmit={handleSubmit(updatePostById)}>
        <div className="border-b pb-4 mb-6">
          <Typography.Title level={2} className="!mb-0 text-2xl text-gray-800">
            Edit Post
          </Typography.Title>
        </div>

        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
          <InputLabel htmlFor="title" classses={"w-full sm:w-1/3"}>
            Title
          </InputLabel>
          <TextInputController
            name="title"
            control={control}
            errorMsg={errors?.title?.message}
            classes={"w-full sm:w-2/3"}
            placeholder="Enter title"
          />
        </div>

        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
          <InputLabel htmlFor="categoryId" classses={"w-full sm:w-1/3"}>
            Select Category
          </InputLabel>
          <SelectInputController
            options={categories?.map((cat) => ({
              label: cat.title,
              value: cat._id,
            }))}
            name="categoryId"
            control={control}
            errorMsg={errors?.categoryId?.message}
            classes={"w-full sm:w-2/3"}
            placeholder="Select category"
          />
        </div>

        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
          <InputLabel htmlFor="status" classses={"w-full sm:w-1/3"}>
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
            classes={"w-full sm:w-2/3"}
            placeholder="Select status"
          />
        </div>

        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
          <InputLabel htmlFor="content" classses={"w-full sm:w-1/3"}>
            Content
          </InputLabel>
          <TextAreaController
            name="content"
            control={control}
            errorMsg={errors?.content?.message}
            classes={"w-full sm:w-2/3"}
            autoSize={{ minRows: 10 }}
            placeholder="Enter content here"
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
            action=""
          >
            {imageData ? (
              <div>
                <img
                  src={imageData}
                  alt="preview"
                  className="w-full h-20 object-cover rounded-md"
                />
                <div className="text-center mt-1 text-blue-500 text-sm">
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

        <div className="mt-6 flex justify-end gap-4">
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
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Layout.Content>
  );
};

export default EditPost;
