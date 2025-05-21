import { Layout, Typography, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  InputLabel,
  PasswordInputController,
  SelectInputController,
  TextAreaController,
  TextInputController,
} from "../..//components/input.component";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { type UploadProps, type UploadFile } from "antd";
import { useState } from "react";
import userSvc from "../../services/user.service";
import notifcation, { NotificationType } from "../../utilities/helpers";
import * as Yup from "yup";
import { useNavigate } from "react-router";

const CreateUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const navigate = useNavigate();

  const createUserSchema = Yup.object({
    fullName: Yup.string().min(2).max(50).required(),
    username: Yup.string().min(2).max(50).required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
    address: Yup.string().max(100).required(),
    role: Yup.string().required(),
    status: Yup.string().required(),
    gender: Yup.string().required(),
    phone: Yup.string().matches(/^[0-9]{10}$/, "Phone must be 10 digits").required(),
    bio: Yup.string().max(500),
    image: Yup.mixed().nullable(),
    socialMedia: Yup.string().optional(),
  });

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      address: "",
      status: "",
      role: "",
      phone: "",
      gender: "",
      bio: "",
      image: null,
      socialMedia: "",
    },
    resolver: yupResolver(createUserSchema),
  });

   const uploadProps: UploadProps = {
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

  const submitHandler = async (data: any) => {
    setLoading(true);
    try {
      await userSvc.postRequest("/user/create", data, { file: true });
      notifcation("New user created", NotificationType.SUCCESS);
      navigate("/admin/users");
    } catch (error) {
      notifcation("User cannot be created now", NotificationType.ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout.Content className="bg-white p-8 rounded-md shadow-md">
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="border-b pb-4 mb-6">
          <Typography.Title level={2} className="!mb-0 !text-2xl font-semibold text-gray-800">
            User Creation
          </Typography.Title>
        </div>

        {/* Full Name */}
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
          <InputLabel htmlFor="fullName" classses="w-full sm:w-1/3">Full Name</InputLabel>
          <TextInputController
            name="fullName"
            control={control}
            errorMsg={errors?.fullName?.message}
            placeholder="Full Name"
            classes="w-full sm:w-2/3"
          />
        </div>

        {/* Username */}
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
          <InputLabel htmlFor="username" classses="w-full sm:w-1/3">Username</InputLabel>
          <TextInputController
            name="username"
            control={control}
            errorMsg={errors?.username?.message}
            placeholder="Username"
            classes="w-full sm:w-2/3"
          />
        </div>

        {/* Email (Fixed error binding) */}
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
          <InputLabel htmlFor="email" classses="w-full sm:w-1/3">Email</InputLabel>
          <TextInputController
            name="email"
            control={control}
            errorMsg={errors?.email?.message} // ✅ Fixed here
            placeholder="example@example.com"
            classes="w-full sm:w-2/3"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
          <InputLabel htmlFor="password" classses="w-full sm:w-1/3">Password</InputLabel>
          <PasswordInputController
            name="password"
            control={control}
            errorMsg={errors?.password?.message}
            classes="w-full sm:w-2/3"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
          <InputLabel htmlFor="phone" classses="w-full sm:w-1/3">Phone (mob)</InputLabel>
          <TextInputController
            name="phone"
            control={control}
            errorMsg={errors?.phone?.message}
            placeholder="10 digit mob-number"
            classes="w-full sm:w-2/3"
          />
        </div>

        {/* Address */}
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
          <InputLabel htmlFor="address" classses="w-full sm:w-1/3">Address</InputLabel>
          <TextInputController
            name="address"
            control={control}
            errorMsg={errors?.address?.message}
            placeholder="Your address"
            classes="w-full sm:w-2/3"
          />
        </div>

        {/* Role */}
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
          <InputLabel htmlFor="role" classses="w-full sm:w-1/3">Role</InputLabel>
          <SelectInputController
            options={[{ label: "author", value: "author" }, { label: "reader", value: "user" }]}
            name="role"
            control={control}
            errorMsg={errors?.role?.message}
            classes="w-full sm:w-2/3"
            placeholder="Select role"
          />
        </div>

        {/* Gender */}
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
          <InputLabel htmlFor="gender" classses="w-full sm:w-1/3">Gender</InputLabel>
          <SelectInputController
            options={[
              { label: "male", value: "male" },
              { label: "female", value: "female" },
              { label: "other", value: "other" },
            ]}
            name="gender"
            control={control}
            errorMsg={errors?.gender?.message}
            classes="w-full sm:w-2/3"
          />
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
          <InputLabel htmlFor="status" classses="w-full sm:w-1/3">Status</InputLabel>
          <SelectInputController
            options={[{ label: "active", value: "active" }, { label: "inactive", value: "inactive" }]}
            name="status"
            control={control}
            errorMsg={errors?.status?.message}
            classes="w-full sm:w-2/3"
            placeholder="Select status"
          />
        </div>

        {/* Social Media */}
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
          <InputLabel htmlFor="socialMedia" classses="w-full sm:w-1/3">Social Media Link</InputLabel>
          <TextInputController
            name="socialMedia"
            control={control}
            errorMsg={errors?.socialMedia?.message}
            placeholder="facebook, linkedin etc."
            classes="w-full sm:w-2/3"
          />
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
          <InputLabel htmlFor="bio" classses="w-full sm:w-1/3">Bio</InputLabel>
          <TextAreaController
            name="bio"
            control={control}
            errorMsg={errors?.bio?.message}
            placeholder="Write about yourself"
            classes="w-full sm:w-2/3"
          />
        </div>

        {/* Profile Image Upload */}
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
          <InputLabel htmlFor="image" classses="w-full sm:w-1/3">Profile Image</InputLabel>
          <div className="w-full sm:w-2/3">
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
            {errors?.image?.message && (
              <span className="text-red-500 text-sm">{errors.image.message}</span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-3">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading} // ✅ Using correct loading state
            className="w-40 h-9 text-[17px]"
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </Layout.Content>
  );
};

export default CreateUser;
