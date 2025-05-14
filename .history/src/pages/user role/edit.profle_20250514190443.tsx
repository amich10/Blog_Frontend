import { useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../../context/auth.context";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const EditProfile = () => {

    const { userDetails, setUserDetails } = useAuth();
    const navigate = useNavigate();

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
        socialLinks: Yup.string().url("Invalid URL format").optional(),
      });

    const [loading, setLoading] = useState(false);

    };
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
          coverImage:null,
          socialMedia: "",
        },
        resolver: yupResolver(editUserSchema),
      });

    return (
        <Layout.Content>
            <main className="w-full mx-auto px-4 py-4 bg-white">
                <form >


                </form>
            </main>
        </Layout.Content>
    );
};

export default EditProfile;
