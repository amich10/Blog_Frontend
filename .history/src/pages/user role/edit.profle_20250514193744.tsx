import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth.context";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Layout } from "antd";
import { type UploadProps, type UploadFile } from "antd";
import userSvc from "../../services/user.service";
import notifcation, { NotificationType } from "../../utilities/helpers";

const EditProfile = () => {
  const { userDetails, setUserDetails } = useAuth();
  const navigate = useNavigate();
  const [imageData, setImageData] = useState<string>();
  const [coverImageData, setCoverImageData] = useState<string>();

  const editUserSchema = Yup.object({
    name: Yup.string()
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

  const editUserById = async (data: any) => {
    try {
      await userSvc.patchRequest("/user/" + userDetails._id, data, { file: true });
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
    if (userDetails) {
      setValue("name", userDetails.name || "");
      setValue("username", userDetails.username || "");
      setValue("address", userDetails.address || "");
      setValue("bio", userDetails.bio || "");
      setValue("image", userDetails.image || null);
      setImageData(userDetails.image.optimizedUrl);
      setCoverImageData(userDetails.coverImage.optimizedUrl);
      setValue("socialMedia", userDetails.socialMedia || "");
    }
}, [userDetails, setValue]);


  return (
    <Layout.Content>
      <main className="w-full mx-auto px-4 py-4 bg-white max-w-2xl rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>
      <form onSubmit={handleSubmit(editUserById)} className="space-y-6">
        {/* Profile Image Upload */}
        <div>
        <label className="block font-medium mb-1">Profile Image</label>
        <div className="flex items-center space-x-4">
          {imageData && (
          <img
            src={imageData}
            alt="Profile Preview"
            className="w-16 h-16 rounded-full object-cover border"
          />
          )}
          <input
          type="file"
          accept="image/*"
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) {
            props.beforeUpload?.(file);
            }
          }}
          />
        </div>
        {errors.image && (
          <p className="text-red-500 text-xs mt-1">{errors.image.message as string}</p>
        )}
        </div>

        {/* Cover Image Upload */}
        <div>
        <label className="block font-medium mb-1">Cover Image</label>
        <div className="flex items-center space-x-4">
          {coverImageData && (
          <img
            src={coverImageData}
            alt="Cover Preview"
            className="w-32 h-16 object-cover border rounded"
          />
          )}
          <input
          type="file"
          accept="image/*"
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) {
            setCoverImageData(URL.createObjectURL(file));
            setValue("coverImage", file as any);
            }
          }}
          />
        </div>
        {errors.coverImage && (
          <p className="text-red-500 text-xs mt-1">{errors.coverImage.message as string}</p>
        )}
        </div>

        {/* Name */}
        <div>
        <label className="block font-medium mb-1">Full Name</label>
        <input
          className="w-full border rounded px-3 py-2"
          type="text"
          {...control.register("name")}
          placeholder="Enter your full name"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message as string}</p>
        )}
        </div>

        {/* Username */}
        <div>
        <label className="block font-medium mb-1">Username</label>
        <input
          className="w-full border rounded px-3 py-2"
          type="text"
          {...control.register("username")}
          placeholder="Enter your username"
        />
        {errors.username && (
          <p className="text-red-500 text-xs mt-1">{errors.username.message as string}</p>
        )}
        </div>

        {/* Address */}
        <div>
        <label className="block font-medium mb-1">Address</label>
        <input
          className="w-full border rounded px-3 py-2"
          type="text"
          {...control.register("address")}
          placeholder="Enter your address"
        />
        {errors.address && (
          <p className="text-red-500 text-xs mt-1">{errors.address.message as string}</p>
        )}
        </div>

        {/* Bio */}
        <div>
        <label className="block font-medium mb-1">Bio</label>
        <textarea
          className="w-full border rounded px-3 py-2"
          rows={3}
          {...control.register("bio")}
          placeholder="Tell us about yourself"
        />
        {errors.bio && (
          <p className="text-red-500 text-xs mt-1">{errors.bio.message as string}</p>
        )}
        </div>

        {/* Social Media */}
        <div>
        <label className="block font-medium mb-1">Social Media URL</label>
        <input
          className="w-full border rounded px-3 py-2"
          type="url"
          {...control.register("socialMedia")}
          placeholder="https://your-social-link.com"
        />
        {errors.socialMedia && (
          <p className="text-red-500 text-xs mt-1">{errors.socialMedia.message as string}</p>
        )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
        </div>
      </form>
      </main>
    </Layout.Content>
  );
};

export default EditProfile;
