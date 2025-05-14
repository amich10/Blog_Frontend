import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth.context";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Layout } from "antd";
import { type UploadProps, type UploadFile, Upload } from "antd";
import userSvc from "../../services/user.service";
import notifcation, { NotificationType } from "../../utilities/helpers";
import { InputLabel } from "../../components/input.component";

const EditProfile = () => {
  const { userDetails, setUserDetails } = useAuth();
  const navigate = useNavigate();
  const [imageData, setImageData] = useState<string>();
  const [coverImageData, setCoverImageData] = useState<string>();

  const editUserSchema = Yup.object({
    name: Yup.string().min(2).max(50).required("Full Name is required"),
    username: Yup.string().min(2).max(50).required("Username is required"),
    address: Yup.string().max(100).required("Address is required"),
    bio: Yup.string().max(200),
    image: Yup.mixed().nullable(),
    coverImage: Yup.mixed().nullable(),
    socialMedia: Yup.string().url("Invalid URL format").optional(),
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      address: "",
      bio: "",
      image: null,
      coverImage: null,
      socialMedia: "",
    },
    resolver: yupResolver(editUserSchema),
  });

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [coverFileList, setCoverFileList] = useState<UploadFile[]>([]);

  const imageUploadProps: UploadProps = {
    onRemove: (file) => {
      setFileList([]);
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

  const coverImageUploadProps: UploadProps = {
    onRemove: (file) => {
      setCoverFileList([]);
      setValue("coverImage", null);
    },
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
    try {
      await userSvc.patchRequest("/user/" + userDetails._id, data, {
        file: true,
      });
      notifcation("User details edited successfully", NotificationType.SUCCESS);
      navigate("/admin/users");
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
      setValue("name", userDetails.name || "");
      setValue("username", userDetails.username || "");
      setValue("address", userDetails.address || "");
      setValue("bio", userDetails.bio || "");
      setValue("image", userDetails.image || null);
      setValue("coverImage", userDetails.coverImage || null);
      setValue("socialMedia", userDetails.socialMedia || "");

      setImageData(userDetails.image?.optimizedUrl || "");
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
              src={coverImageData}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 right-4">
              <Upload {...coverImageUploadProps} showUploadList={false}>
                <button className="bg-white bg-opacity-80 px-4 py-2 rounded-md hover:bg-opacity-100 transition">
                  <i className="fas fa-camera mr-2" />
                  Change Cover
                </button>
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
                    <button type="button" className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800 transition">
                      <i className="fas fa-camera" />
                    </button>
                  </Upload>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <InputLabel htmlFor="fullName" classses={"block text-sm font-medium text-gray-700 mb-1"}>Full Name</InputLabel>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    )}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    )}
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm">{errors.username.message}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <Controller
                    name="bio"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    )}
                  />
                  {errors.bio && (
                    <p className="text-red-500 text-sm">{errors.bio.message}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    )}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm">{errors.address.message}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Social Media (Link)
                  </label>
                  <Controller
                    name="socialMedia"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    )}
                  />
                  {errors.socialMedia && (
                    <p className="text-red-500 text-sm">
                      {errors.socialMedia.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition mr-4"
                  onClick={() => navigate("/admin/users")}
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
