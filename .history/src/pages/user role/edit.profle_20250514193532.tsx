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
      setImageData( userDetails.coverImage || null);
      setValue("socialMedia", userDetails.socialMedia || "");
    }
}, [userDetails, setValue]);


  return (
    <Layout.Content>
      <main className="w-full mx-auto px-4 py-4 bg-white">
        <form onSubmit={handleSubmit(editUserById)}>
            
        </form>
      </main>
    </Layout.Content>
  );
};

export default EditProfile;
