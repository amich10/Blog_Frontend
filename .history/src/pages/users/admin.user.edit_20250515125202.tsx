import { useNavigate, useParams } from "react-router";
import userSvc from "../../services/user.service";
import notifcation, { NotificationType } from "../../utilities/helpers";
import { useEffect, useState } from "react";
import { Button, Layout, Typography, Upload } from "antd";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  InputLabel,
  PasswordInputController,
  SelectInputController,
  TextInputController,
} from "../../components/input.component";
import { UploadOutlined } from "@ant-design/icons";
import { type UploadProps, type UploadFile } from "antd";

const UserEdit = () => {
  const params = useParams();
  const [userData, setUserData] = useState<any>();
  const navigate = useNavigate();
  const [imageData, setImageData] = useState<string>();

  const editUserSchema = Yup.object({
    fullName: Yup.string()
      .min(2, "Full Name must be at least 2 characters")
      .max(50, "Full Name cannot exceed 50 characters")
      .required("Full Name is required"),
    username: Yup.string()
      .min(2, "Username must be at least 2 characters")
      .max(50, "Username cannot exceed 50 characters")
      .required("Username is required"),
    address: Yup.string()
      .max(100, "Address cannot exceed 100 characters")
      .required("Address is required"),
    bio: Yup.string().max(200, "Bio cannot exceed 200 characters"),
    image: Yup.mixed().nullable(),
    socialMedia: Yup.string().url("Invalid URL format").optional(),
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
      address:"",
      bio: "",
      image: null,
      socialMedia: "",
    },
    resolver: yupResolver(editUserSchema),
  });

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
      setValue("image", null); // Reset image value in the form
    },
    beforeUpload: (file) => {
      console.log("FILE SELECTED", file);
      setFileList([file]); // Set file list to the selected file
      setValue("image", file as any); // Set file in the form value
      const reader = new FileReader();
      reader.onload = () => setImageData(reader.result as string); // Update image preview
      reader.readAsDataURL(file);
      return false; // Prevent default upload behavior
    },
    fileList,
  };

  const getUserById = async () => {
    try {
      const user = await userSvc.getRequest("/user/" + params.id);
      console.log(user);
      setUserData(user.result.data);
    } catch (exception) {
      notifcation(
        "Sorry the requested users cannot be retrieved now. Please try again later.",
        NotificationType.ERROR
      );
      navigate("/admin/users");
    }
  };

  const editUserById = async (data: any) => {
    try {
      await userSvc.patchRequest("/user/" + params.id, data, { file: true });
      notifcation("User details edited successfully", NotificationType.SUCCESS);
      navigate("/admin/users");
    } catch (exception) {
      console.log(exception);
      notifcation(
        "User detail cannot be edited at this time. Please try again later",
        NotificationType.ERROR
      );
      navigate("/admin/users");
    }
  };

  useEffect(() => {
    getUserById();
  }, []);

  useEffect(() => {
    if (userData) {
      setValue("fullName", userData?.fullName);
      setValue("username", userData?.username);
      setValue("address", userData?.address);
      setValue("bio", userData?.bio);
      setValue("socialMedia", userData?.socialLinks);
      setImageData(userData?.image?.optimizedUrl);
    }
  }, [userData, setValue]);

  return (
    <Layout.Content className="bg-white p-8 rounded-md shadow-md">
      <form onSubmit={handleSubmit(editUserById)}>
        <div className="border-b pb-4 mb-6">
          <Typography.Title level={2} className="!mb-0 !text-2xl font-semibold text-gray-800">
            Edit User
          </Typography.Title>
        </div>
        <div>
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
            <InputLabel htmlFor="fullName" classses={"w-full sm:w-1/3"}>
              Full Name
            </InputLabel>
            <TextInputController
              classes={"w-full sm:w-2/3"}
              name="fullName"
              control={control}
              errorMsg={errors?.fullName?.message}
              placeholder="Full name"
              type="text"
            />
          </div>

          <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
            <InputLabel htmlFor="username" classses={"w-full sm:w-1/3"}>
              Username
            </InputLabel>
            <TextInputController
              classes={"w-full sm:w-2/3"}
              name="username"
              control={control}
              errorMsg={errors?.username?.message}
              placeholder="Username"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
            <InputLabel htmlFor="address" classses={"w-full sm:w-1/3"}>
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
            <InputLabel htmlFor="gender" classses={"w-full sm:w-1/3"}>
              Select a Gender
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

          <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
            <InputLabel htmlFor="status" classses={"w-full sm:w-1/3"}>
              Status
            </InputLabel>
            <SelectInputController
              options={[
                { label: "active", value: "active" },
                { label: "inactive", value: "inactive" },
              ]}
              name="status"
              control={control}
              errorMsg={errors?.status?.message}
              classes={"w-full sm:w-2/3"}
              placeholder="Select status"
            />
          </div>

          <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
            <InputLabel htmlFor="socialLinks" classses={"w-full sm:w-1/3"}>
              Social Link
            </InputLabel>
            <TextInputController
              classes={"w-full sm:w-2/3 sm:ml-1"}
              name="socialLinks"
              control={control}
              errorMsg={errors?.socialLinks?.message}
              placeholder="Facebook link here..."
            />
          </div>

          <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2 sm:mr-4">
            <InputLabel htmlFor="bio" classses={"w-full sm:w-1/3"}>
              Bio
            </InputLabel>
            <TextInputController
              classes={"w-full sm:w-2/3"}
              name="bio"
              control={control}
              errorMsg={errors?.bio?.message}
              placeholder="Short bio here"
            />
          </div>

          <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-4">
            <InputLabel htmlFor="image" classses={"w-full sm:w-1/3"}>
              Profile Image
            </InputLabel>
            <Upload
              {...props}
              listType="picture-card"
              showUploadList={false}
              maxCount={1}
              accept="image/*"
            >
              {imageData ? (
                <img
                  src={imageData}
                  alt="user avatar"
                  className="!w-full h-20 object-cover rounded-md"
                />
              ) : (
                <div>
                  <UploadOutlined />
                  <div>Click or drag to upload</div>
                </div>
              )}
            </Upload>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Button type="default" onClick={() => navigate("/admin/users")}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Layout.Content>
  );
};

export default UserEdit;
