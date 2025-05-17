import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth.context";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button, Layout } from "antd";
import { type UploadProps, type UploadFile, Upload } from "antd";
import userSvc from "../../services/user.service";
import notifcation, { NotificationType } from "../../utilities/helpers";
import {
  InputLabel,
  TextAreaController,
  TextInputController,
} from "../../components/input.component";
import { EditOutlined } from "@ant-design/icons";

const EditProfile = () => {
  const { userDetails, setUserDetails } = useAuth();
  const navigate = useNavigate();
  const [imageData, setImageData] = useState<string>("");
  const [coverImageData, setCoverImageData] = useState<string>("");

  const editUserSchema = Yup.object({
    fullName: Yup.string().min(2).max(50).required("Full Name is required"),
    username: Yup.string().min(2).max(50).required("Username is required"),
    address: Yup.string().max(100).required("Address is required"),
    bio: Yup.string().max(200),
    image: Yup.object({
      url: Yup.string().nullable(),
      optimizedUrl: Yup.string().nullable(),
    }).nullable(),
    coverImage: Yup.object({
      url: Yup.string().nullable(),
      optimizedUrl: Yup.string().nullable(),
    }).nullable(),
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
      address: "",
      bio: "",
      image:{
        url:"",
        optimizedUrl:""
      },
      coverImage: {
        url:"",
        optimizedUrl:""
      },
      socialMedia: ""
    },
    resolver: yupResolver(editUserSchema),
  });

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [coverFileList, setCoverFileList] = useState<UploadFile[]>([]);

  const imageUploadProps: UploadProps = {

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

  const coverImageUploadProps: UploadProps = {
    beforeUpload: (file) => {
      setCoverFileList([file]);
      setValue("coverImage", file as any);
      const reader = new FileReader();
      reader.onload = () => setCoverImageData(reader.result as string);
      reader.readAsDataURL(file);
      return false;
    },
    fileList: coverFileList,
  };
  

  const onSubmit = async (data: any) => {
    console.log(data)
    try {
      const response = await userSvc.patchRequest("/user/" + userDetails._id, data, {
        file: true,
      });
      notifcation("User details edited successfully", NotificationType.SUCCESS);
      setUserDetails(response.result.data)
      notifcation("Profile edited successfully",NotificationType.SUCCESS)
      navigate("/blogs/my-profile");
    } catch (exception) {
      console.error(exception);
      notifcation(
        "User detail cannot be edited at this time. Please try again later",
        NotificationType.ERROR
      );
    }
  };

  useEffect(() => {
    if (userDetails) {
      setValue("fullName", userDetails.fullName || "");
      setValue("username", userDetails.username || "");
      setValue("address", userDetails.address || "");
      setValue("bio", userDetails.bio || "");
      setValue("image", {
        url: userDetails.image?.url || "",
        optimizedUrl: userDetails.image?.optimizedUrl || ""
      });
      setValue("coverImage", {
        url: userDetails.coverImage?.url || "",
        optimizedUrl: userDetails.coverImage?.optimizedUrl || ""
      });
      setValue("socialMedia", userDetails.socialMedia || "");

      setImageData({
        url: userDetails.coverImage?.url || "",
        optimizedUrl: userDetails.coverImage?.optimizedUrl || ""
      });
      setCoverImageData(userDetails.coverImage?.optimizedUrl || "");
    }
  }, [userDetails, setValue]);

  return (
    <Layout.Content className="bg-white shadow-md overflow-hidden">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Cover Image Section */}
        <div className="relative h-48 bg-gray-200">
          <img
            id="coverPreview"
            src={coverImageData || ""}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 right-4">
            <Upload {...coverImageUploadProps} showUploadList={false}>
              <Button className="z-50 bg-green-800 text-white">
                <EditOutlined />
              </Button>
            </Upload>
          </div>
        </div>
        

        {/* Profile Image Section */}
        <div className="px-6 -mt-16 relative">
          <div className="flex items-end">
            <div className="relative">
              <img
                id="avatarPreview"
                src={imageData}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
              />
              <div className="absolute bottom-2 right-2">
                <Upload {...imageUploadProps} showUploadList={false}>
                  <Button className="rounded-full! h-10! w-10! bg-green-800! text-white!">
                    <EditOutlined />
                  </Button>
                </Upload>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <InputLabel
                htmlFor="fullName"
                classses={"block text-sm font-medium text-gray-700 mb-1"}
              >
                Full Name
              </InputLabel>
              <TextInputController
                type="text"
                name="fullName"
                control={control}
                errorMsg={errors?.fullName?.message}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <InputLabel
                htmlFor="username"
                classses={"block text-sm font-medium text-gray-700 mb-1"}
              >
                Username
              </InputLabel>
              <TextInputController
                type="text"
                name="username"
                control={control}
                errorMsg={errors?.username?.message}
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <InputLabel
                htmlFor="bio"
                classses={"block text-sm font-medium text-gray-700 mb-1"}
              >
                Bio
              </InputLabel>
              <TextAreaController
                name="bio"
                control={control}
                errorMsg={errors?.bio?.message}
              />
              {errors.bio && (
                <p className="text-red-500 text-sm">{errors.bio.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <InputLabel
                htmlFor="addresss"
                classses={"block text-sm font-medium text-gray-700 mb-1"}
              >
                Bio
              </InputLabel>
              <TextInputController
                name="address"
                control={control}
                errorMsg={errors?.address?.message}
              />
              {errors.bio && (
                <p className="text-red-500 text-sm">
                  {errors?.address?.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <InputLabel
                htmlFor="SocailMedia"
                classses={"block text-sm font-medium text-gray-700 mb-1"}
              >
                Social Media{" "}
              </InputLabel>
              <TextInputController
                name="socialMedia"
                control={control}
                errorMsg={errors?.socialMedia?.message}
              />
              {errors.bio && (
                <p className="text-red-500 text-sm">
                  {errors?.socialMedia?.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition mr-4"
              onClick={() => navigate("/blogs/my-profile")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </Layout.Content>
  );
};

export default EditProfile;
