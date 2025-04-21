import { Layout, Typography, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  InputLabel,
  PasswordInputController,
  SelectInputController,
  TextAreaController,
  TextInputController,
} from "../../components/input.component";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { type UploadProps, type UploadFile } from "antd";
import { useState } from "react";
import userSvc from "../../services/user.service";
import notifcation, { NotificationType } from "../../utilities/helpers";
import * as Yup from "yup"
import { useNavigate } from "react-router";

const CreateUser = () => {
    const navigate = useNavigate()
    const createUserSchema = Yup.object({
        fullName: Yup.string().min(2, "Full Name must be at least 2 characters").max(50, "Full Name cannot exceed 50 characters").required("Full Name is required"),
        username: Yup.string().min(2, "Username must be at least 2 characters").max(50, "Username cannot exceed 50 characters").required("Username is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        address: Yup.string().max(100, "Address cannot exceed 100 characters").required("Address is required"),
        role: Yup.string().required(),
        gender: Yup.string().required(),
        phone: Yup.string()
            .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
            .required("Phone number is required"),
        bio: Yup.string().max(200, "Bio cannot exceed 200 characters"),
        image: Yup.mixed().nullable(),
        socialLinks:Yup.string().url("Invalid URL format").optional(),
    });
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
      address: "",
      role: "",
      phone: "",
      gender: "",
      bio: "",
      image: null,
      socialLinks: "",
    },
    resolver: yupResolver(createUserSchema),
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
        await userSvc.postRequest('/user/create', data, { file: true })
        notifcation('New user created',NotificationType.SUCCESS)
        navigate("admin/users")

    } catch (exception) {
        notifcation("User cannot be created now",NotificationType.ERROR)
    }
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
                  { label: "author", value: "author" },
                  { label: "reader", value: "user" },
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
              loading
              disabled={isSubmitting}
              className="border-2 border-blue-600! w-40 h-9 text-[17px] text-blue-600!"
              htmlType="submit"
            >
              Create
            </Button>
          </div>
        </div>
        </form>
      </Layout.Content>
    </>
  );
};

export default CreateUser;
