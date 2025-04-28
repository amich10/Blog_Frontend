import { Button, Layout, Upload } from "antd";
import {
  InputLabel,
  SelectInputController,
  TextAreaController,
  TextInputController,
} from "../../../components/input.component";
import { useForm } from "react-hook-form";
import { FileImageOutlined, UploadOutlined } from "@ant-design/icons";

const CreateBlog = () => {
  const { handleSubmit, control } = useForm();

  return (
    <>
      <Layout.Content className="container mx-auto px-6 py-8 bg-gray-500">
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
          <form className="px-8 py-6 space-y-6">
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
                  <Button className="h-10! w-100 flex justify-start items-center">
                    <div>Upload an Image</div><FileImageOutlined />
                  </Button>
                </Upload>
              </div>
            </div>
            <div>
              <InputLabel htmlFor="conent">Content</InputLabel>
              <TextAreaController/>
            </div>
          </form>
        </div>
      </Layout.Content>
    </>
  );
};

export default CreateBlog;
