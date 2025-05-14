import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth.context";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Layout } from "antd";
import { type UploadProps, type UploadFile,Upload } from "antd";
import userSvc from "../../services/user.service";
import notifcation, { NotificationType } from "../../utilities/helpers";
import { InputLabel, TextInputController } from "../../components/input.component";
import { UploadOutlined } from "@ant-design/icons";


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
      await userSvc.patchRequest("/user/" + userDetails._id, data, {
        file: true,
      });
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
     div class="max-w-6xl mx-auto px-4 py-8">
        <div class="flex justify-between items-center mb-8">
            <h1 class="text-2xl font-bold text-gray-800">Edit Profile</h1>
            <button class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition">Cancel</button>
        </div>

        <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <!-- Cover Image Section -->
            <div class="relative h-48 bg-gray-200">
                <img id="coverPreview" src="https://via.placeholder.com/1200x300" alt="Cover" class="w-full h-full object-cover">
                <label for="coverImage" class="absolute bottom-4 right-4 bg-white bg-opacity-80 px-4 py-2 rounded-md cursor-pointer hover:bg-opacity-100 transition">
                    <i class="fas fa-camera mr-2"></i>Change Cover
                    <input type="file" id="coverImage" accept="image/*" class="hidden">
                </label>
            </div>

            <!-- Profile Image Section -->
            <div class="px-6 -mt-16 relative">
                <div class="flex items-end">
                    <div class="relative">
                        <img id="avatarPreview" src="https://via.placeholder.com/150" alt="Profile" class="w-32 h-32 rounded-full border-4 border-white object-cover">
                        <label for="profileImage" class="absolute bottom-2 right-2 bg-gray-700 text-white p-2 rounded-full cursor-pointer hover:bg-gray-800 transition">
                            <i class="fas fa-camera"></i>
                            <input type="file" id="profileImage" accept="image/*" class="hidden">
                        </label>
                    </div>
                </div>
            </div>

            <!-- Form Section -->
            <div class="px-6 py-8">
                <form>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Full Name -->
                        <div>
                            <label for="fullName" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input type="text" id="fullName" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="John Doe">
                        </div>

                        <!-- Username -->
                        <div>
                            <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <input type="text" id="username" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="johndoe">
                        </div>

                        <!-- Bio -->
                        <div class="md:col-span-2">
                            <label for="bio" class="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                            <textarea id="bio" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Tell us about yourself..."></textarea>
                        </div>

                        <!-- Address -->
                        <div class="md:col-span-2">
                            <label for="address" class="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <input type="text" id="address" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="123 Main St, City, Country">
                        </div>

                        <!-- Social Media -->
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Social Media</label>
                            <div class="space-y-3">
                                <div class="flex items-center">
                                    <span class="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-md mr-3">
                                        <i class="fab fa-twitter text-blue-500"></i>
                                    </span>
                                    <input type="text" placeholder="Twitter username" class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                                </div>
                                <div class="flex items-center">
                                    <span class="w-8 h-8 flex items-center justify-center bg-pink-100 rounded-md mr-3">
                                        <i class="fab fa-instagram text-pink-500"></i>
                                    </span>
                                    <input type="text" placeholder="Instagram username" class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                                </div>
                                <div class="flex items-center">
                                    <span class="w-8 h-8 flex items-center justify-center bg-blue-600 rounded-md mr-3">
                                        <i class="fab fa-facebook-f text-white"></i>
                                    </span>
                                    <input type="text" placeholder="Facebook username" class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                                </div>
                                <div class="flex items-center">
                                    <span class="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-md mr-3">
                                        <i class="fab fa-github text-white"></i>
                                    </span>
                                    <input type="text" placeholder="GitHub username" class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-8 flex justify-end">
                        <button type="button" class="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition mr-4">Cancel</button>
                        <button type="submit" class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    </Layout.Content>
  );
};

export default EditProfile;
