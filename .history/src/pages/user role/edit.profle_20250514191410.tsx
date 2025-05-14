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

  const editUserSchema = Yup.object({
    fullName: Yup.string()
      .min(2, "Full Name must be at least 2 characters")
      .max(50, "Full Name cannot exceed 50 characters")
      .required("Full Name is required"),
    username: Yup.string()
      .min(2, "Username must be at least 2 characters")
      .max(50, "Username cannot exceed 50 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    address: Yup.string()
      .max(100, "Address cannot exceed 100 characters")
      .required("Address is required"),
    role: Yup.string().required(),
    status: Yup.string().required(),
    gender: Yup.string().required(),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
    bio: Yup.string().max(200, "Bio cannot exceed 200 characters"),
    image: Yup.mixed().nullable(),
    coverImage: Yup.mixed().nullable(),
    socialMedia: Yup.string().url("Invalid URL format").optional(),
  });

  const [loading, setLoading] = useState(false);

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
      status: "",
      role: "",
      phone: "",
      gender: "",
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
      setValue("fullName", userDetails.name || "");
      setValue("username", userDetails.username || "");
      setValue("address", userDetails.address || "");
      setValue("bio", userDetails.bio || "");
      setValue("image", userDetails.image || null);
      setValue("coverImage", userDetails.coverImage || null);
      setValue("socialMedia", userDetails.socialMedia || "");
    }
}, [userDetails, setValue]);


  return (
    <Layout.Content>
      <main className="w-full mx-auto px-4 py-4 bg-white max-w-xl rounded shadow">
        <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>
        <form onSubmit={handleSubmit(editUserById)} className="space-y-5">
          {/* Profile Image Upload */}
          <div>
            <label className="block font-medium mb-1">Profile Image</label>
            <div className="flex items-center space-x-4">
              {imageData || (userDetails?.image && typeof userDetails.image === "string") ? (
                <img
                  src={imageData || userDetails?.image}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover border"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                  <span className="text-xl">?</span>
                </div>
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
              <p className="text-red-500 text-xs mt-1">{String(errors.image.message)}</p>
            )}
          </div>

          {/* Full Name */}
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              className="w-full border rounded px-3 py-2"
              {...control.register("fullName")}
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
            )}
          </div>

          {/* Username */}
          <div>
            <label className="block font-medium mb-1">Username</label>
            <input
              className="w-full border rounded px-3 py-2"
              {...control.register("username")}
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              className="w-full border rounded px-3 py-2"
              {...control.register("email")}
              placeholder="Enter your email"
              type="email"
              disabled
              value={userDetails?.email || ""}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              className="w-full border rounded px-3 py-2"
              {...control.register("password")}
              placeholder="Enter new password"
              type="password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block font-medium mb-1">Address</label>
            <input
              className="w-full border rounded px-3 py-2"
              {...control.register("address")}
              placeholder="Enter your address"
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block font-medium mb-1">Phone</label>
            <input
              className="w-full border rounded px-3 py-2"
              {...control.register("phone")}
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block font-medium mb-1">Gender</label>
            <select
              className="w-full border rounded px-3 py-2"
              {...control.register("gender")}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block font-medium mb-1">Role</label>
            <select
              className="w-full border rounded px-3 py-2"
              {...control.register("role")}
              disabled
              value={userDetails?.role || ""}
            >
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              {/* Add more roles as needed */}
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block font-medium mb-1">Status</label>
            <select
              className="w-full border rounded px-3 py-2"
              {...control.register("status")}
            >
              <option value="">Select status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>
            )}
          </div>

          {/* Bio */}
          <div>
            <label className="block font-medium mb-1">Bio</label>
            <textarea
              className="w-full border rounded px-3 py-2"
              {...control.register("bio")}
              placeholder="Tell us about yourself"
              rows={3}
            />
            {errors.bio && (
              <p className="text-red-500 text-xs mt-1">{errors.bio.message}</p>
            )}
          </div>

          {/* Social Media */}
          <div>
            <label className="block font-medium mb-1">Social Media URL</label>
            <input
              className="w-full border rounded px-3 py-2"
              {...control.register("socialMedia")}
              placeholder="https://your-social-link"
            />
            {errors.socialMedia && (
              <p className="text-red-500 text-xs mt-1">{errors.socialMedia.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              disabled={isSubmitting || loading}
            >
              {isSubmitting || loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </main>
    </Layout.Content>
  );
};

export default EditProfile;
