import { Button, Layout, Upload } from "antd";
import {
  InputLabel,
  SelectInputController,
  TextAreaController,
  TextInputController,
} from "../../../components/input.component";
import { useForm } from "react-hook-form";
import { UploadOutlined } from "@ant-design/icons";
import * as Yup from "yup";
import { IPostType } from "../../../posts/posts.list";

const CreateBlog = () => {

  const createBlogSchema = Yup.object({
    title:Yup.string().min(2).max(250).required(),
    categoryId:Yup.string().required(),
    content:Yup.string().min(10).max(5000).required(),
    images:Yup.mixed().nullable()
  })
  const { handleSubmit, control,formState:{errors,isSubmitting} } = useForm({
    defaultValues:{
      title:"",
      content:"",
      categoryId:"",
      images:null

    },
      // resolver: yupResolver(createBlogSchema),
  });



  return (
    <>
      <Layout.Content className=" bg-white">
        <div className="max-w-4xl  mx-auto bg-white rouded-xl shadow-sm  overflow-hidden ">
          {/* form header */}
          <div className="px-8 py-6 border-b border-gray-100 ">
            <h1 className="text-2xl  font-bold text-gray-800">
              Create a New blog Post{" "}
            </h1>
            <p className="mt-1 text-gray-500">
              Share your ideas and experience to the world
            </p>
          </div>

          {/* Blog form */}
          <form className="px-8 py-6 space-y-6" onSubmit={handleSubmit((data) => console.log(data))}>
            <div>
              <InputLabel
                htmlFor="title"
                classses={"block! text-sm font-medium mb-2 text-gray0-700"}
              >
                Blog Title
              </InputLabel>
              <TextInputController
                type="text"
                control={control}
                name="title"
                placeholder="Enter your blog title"
                classes={
                  "px-4! py-3! border! border-gray-300! rounded-lg! focus:outline-none! focus:ring-1! focus:ring-green-800! focus:border-transparent! transition-all! "
                }
              />
            </div>
            {/* category and image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <InputLabel htmlFor="category">Select a Category</InputLabel>
                <SelectInputController
                  control={control}
                  name="category"
                  classes={"w-full h-10! border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"}
                  options={[
                    { label: "Technology", value: "technology" },
                    { label: "Health", value: "health" },
                    { label: "Finance", value: "finance" },
                    { label: "Education", value: "education" },
                  ]}
                />
              </div>

              {/* cover image */}
              <div>
                <InputLabel htmlFor="image" classses="block">Cover Image</InputLabel>
                <Upload>
                  <Button className="h-10! w-100 flex! justify-between! ">
                  <UploadOutlined />
                  <div>Upload an Image</div>
                  </Button>
                </Upload>
              </div>
            </div>
            <div>
              <InputLabel htmlFor="content">Content</InputLabel>
              <TextAreaController autoSize={{minRows:20}} control={control} name="content" placeholder="write your blog content here..."/>
            </div>
            <div>
              <Button htmlType="submit" disabled={isSubmitting} loading={isSubmitting}>
                {isSubmitting ? "creating":"create"}
              </Button>
            </div>
          </form>
        </div>
      </Layout.Content>
    </>
  );
};

export default CreateBlog;
