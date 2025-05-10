import { Button, Layout, Upload, ConfigProvider } from "antd";
import {
  InputLabel,
  SelectInputController,
  TextAreaController,
  TextInputController,
} from "../../../components/input.component";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { CiImageOn } from "react-icons/ci";
import { useCategory } from "../../../context/category context/category.context";
import { type UploadProps, type UploadFile } from "antd";
import postSvc from "../../../services/post.service";
import notifcation, { NotificationType } from "../../../utilities/helpers";

const CreateBlog = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const createBlogSchema = Yup.object({
    title: Yup.string().min(2).max(250).required(),
    categoryId: Yup.string().required(),
    content: Yup.string().min(10).max(5000).required(),
    image: Yup.mixed().nullable(),
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


  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,setValue
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      categoryId: "",
      image: null,
    },
    resolver: yupResolver(createBlogSchema),
  });


  

  const ideas = [
    "Share your ideas and experience to the world",
    "Your creativity is key to unlock your imagination",
    "Inspire others with your unique perspective",
    "Express your thoughts and make an impact",
    "Turn your passion into powerful stories",
    "Write about the moments that changed your life",
    "Explore the beauty of storytelling through words",
    "Connect with readers by sharing your journey",
    "Unleash your potential by writing your heart out",
    "Transform your thoughts into meaningful content",
  ];

  const [randomIdea, setRandomIdea] = useState<string>(ideas[0]);
  const {data} = useCategory()

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * ideas.length);
    setRandomIdea(ideas[randomIndex]);
  }, []);

  const submitHandler = async (data: any) => {
    setLoading(true);
    try {
        console.log(data)
      await postSvc.postRequest("/post/create", data, { file: true });
      notifcation("New post created", NotificationType.SUCCESS);
    } catch (exception) {
      console.log(exception)
      notifcation("Post cannot be created now", NotificationType.ERROR);
    } finally {
      setLoading(false);
    }
  };

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
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-100">
            <h1 className="text-2xl font-bold text-[#4f6f52]">
              Create a New Blog Post
            </h1>
            <p className="mt-1 text-gray-500">{randomIdea}</p>
          </div>

          {/* Form */}
          <form
            className="px-8 py-6 space-y-6"
            onSubmit={handleSubmit(submitHandler)}
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
                     <InputLabel htmlFor="image">
                        Cover Image
                      </InputLabel>
                     </div>
                     <div className="bg-red-300">
                     <Upload {...props}>
                        <Button className="h-10! w-101! flex! items-center! justify-between! px-4! py-2! text-sm! md:text-base bg-gray-100 hover:bg-gray-200 transition-all">
                          <span className="truncate">Click to Upload Image</span>
                          <CiImageOn className="h-6! w-6 text-gray-600!" />
                        </Button>
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

            {/* Action Buttons */}
            <div className="flex justify-end mt-4 gap-4">
              <Button
                type="default"
                onClick={() => reset()}
              >
                Reset
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                disabled={isSubmitting || loading}
                loading={isSubmitting || loading}
              >
                {isSubmitting || loading ? "Creating..." : "Create"}
              </Button>
            </div>
          </form>
        </div>
      </Layout.Content>
    </ConfigProvider>
  );
};

export default CreateBlog;
