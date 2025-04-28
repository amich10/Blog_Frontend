import { Layout, Typography, Upload, Button, Select, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { type UploadProps, type UploadFile } from "antd";
import { useState } from "react";
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
    content: Yup.string().max(5000).required("Content is required"),
    image: Yup.mixed().nullable(),
    status: Yup.string().required("Status is required"),
    tags: Yup.array().of(Yup.string()).min(1, "At least one tag is required"),
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    control,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      categoryId: "",
      content: "",
      image: null,
      tags: [],
      status: "published",
    },
    resolver: yupResolver(CreatePostSchema),
  });

  const uploadProps: UploadProps = {
    multiple: false,
    maxCount: 1,
    accept: "image/*",
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
        return false;
      }
      
      const isLt5MB = file.size / 1024 / 1024 < 5;
      if (!isLt5MB) {
        message.error('Image must be smaller than 5MB!');
        return false;
      }

      setFileList([file]);
      setValue("image", file);
      return false;
    },
    onRemove: () => {
      setFileList([]);
      setValue("image", null);
    },
    fileList,
  };

  const submitHandler = async (formData: any) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const postData = new FormData();
      
      // Append all form data to FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'tags' && Array.isArray(value)) {
          value.forEach(tag => postData.append('tags[]', tag));
        } else if (key === 'image' && value) {
          postData.append('image', value);
        } else if (value !== null && value !== undefined) {
          postData.append(key, value as string);
        }
      });

      // Make the request with proper headers
      await postSvc.postRequest("/post/create", postData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      notifcation("Post created successfully!", NotificationType.SUCCESS);
      reset();
      setFileList([]);
      navigate("/admin/posts");
    } catch (error: any) {
      console.error('Post creation error:', error);
      
      let errorMessage = "Failed to create post";
      if (error.response) {
        if (error.response.status === 401) {
          localStorage.removeItem('authToken');
          navigate('/login');
          return;
        }
        errorMessage = error.response.data.message || errorMessage;
      }
      
      notifcation(errorMessage, NotificationType.ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout.Content className="bg-white p-8 rounded-md shadow-md">
      <form onSubmit={handleSubmit(submitHandler)}>
        {/* ... (keep all your existing JSX the same) ... */}
      </form>
    </Layout.Content>
  );
};

export default CreatePost;