import { Layout, Typography, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  InputLabel,
  PasswordInputController,
  RegisterDTO,
  SelectInputController,
  TextAreaController,
  TextInputController,
} from "../../components/input.component";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { type UploadProps, type UploadFile } from "antd";
import { useState } from "react";

const CreateUser = () => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = useForm({
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      role: "",
      phone: "",
      gender: "",
      bio: "",
      image: null,
      socialLinks: [],
    },
    resolver: yupResolver(RegisterDTO),
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
    try {
        awai
    } catch (exception) {}
  };

  return (
    <>
      <Layout.Content className="bg-white p-8 rounded-md shadow-md">
        <form onSubmit={handleSubmit(sumithandler)}>
          <div className="border-b pb-4 mb-6">
            <Typography.Title
              level={2}
              className="!mb-0 !text-2xl font-semibold text-gray-800"
            >
              User Creation
            </Typography.Title>
          </div>
          <div>
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
              <InputLabel htmlFor="fullName" classses={" w-full sm:w-1/3"}>
                Full Name
              </InputLabel>
              <TextInputController
                classes={"w -full sm:w-2/3"}
                name="fullName"
                control={control}
                errorMsg={errors?.fullName?.message}
                placeholder="full name"
                type="text"
              ></TextInputController>
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
              <InputLabel htmlFor="username" classses={" w-full sm:w-1/3"}>
                Username
              </InputLabel>
              <TextInputController
                classes={"w -full sm:w-2/3"}
                name="username"
                control={control}
                errorMsg={errors?.username?.message}
                placeholder="username"
                type="text"
              ></TextInputController>
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
              <InputLabel htmlFor="username" classses={" w-full sm:w-1/3"}>
                Email
              </InputLabel>
              <TextInputController
                classes={"w -full sm:w-2/3"}
                name="email"
                control={control}
                errorMsg={errors?.username?.message}
                placeholder="example@example.com"
                type="email"
              ></TextInputController>
            </div>

            <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
              <InputLabel htmlFor="password" classses={" w-full sm:w-1/3"}>
                Password
              </InputLabel>
              <PasswordInputController
                classes={"w-full sm:w-2/3"}
                name="password"
                control={control}
                errorMsg={errors?.password?.message}
              />
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
              <InputLabel
                htmlFor="confirmPassword"
                classses={" w-full sm:w-1/3"}
              >
                Re-Password
              </InputLabel>
              <PasswordInputController
                classes={"w-full sm:w-2/3"}
                name="confirmPassword"
                control={control}
                errorMsg={errors?.confirmPassword?.message}
              />
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
              <InputLabel htmlFor="phone" classses={" w-full sm:w-1/3"}>
                Phone (mob)
              </InputLabel>
              <TextInputController
                classes={"w-full sm:w-2/3"}
                name="phone"
                control={control}
                errorMsg={errors?.phone?.message}
                placeholder="10 digit mob-number"
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
                  { label: "admin", value: "admin" },
                  { label: "author", value: "author" },
                  { label: "reader", value: "user" },
                ]}
                name="role"
                control={control}
                errorMsg={errors?.role?.message}
                classes={"w-full sm:w-2/3"}
              />
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
              <InputLabel htmlFor="gender" classses={"w-full sm:w-1/3"}>
                Select a gender
              </InputLabel>
              <SelectInputController
                options={[
                  { label: "gender", value: "male" },
                  { label: "female", value: "female" },
                  { label: "other", value: "other" },
                ]}
                name="role"
                control={control}
                errorMsg={errors?.gender?.message}
                classes={"w-full sm:w-2/3"}
              />
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2 ">
              <InputLabel htmlFor="socialLinks" classses={" w-full sm:w-1/3"}>
                Socail Links
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
              <InputLabel htmlFor="image" classses={"w-full sm:w-1/3"}>
                Profile Image
              </InputLabel>
             <Upload {...props}>
                <Button icon={<UploadOutlined />}>
                  Select Image
                </Button>
              </Upload>
            </div>
          <div className="text-center">
            <Button
              type="default"
              disabled={isSubmitting}
              className="border-2 border-blue-600! w-40 h-9 text-[17px] text-blue-600!"
              htmlType="submit"
            >
              <b>Create</b>
            </Button>
          </div>
        </div>
        </form>
      </Layout.Content>
    </>
  );
};

export default CreateUser;
