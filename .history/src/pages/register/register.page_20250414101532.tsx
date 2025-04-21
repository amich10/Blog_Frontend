import { useForm } from "react-hook-form";
import {
  InputLabel,
  PasswordInputController,
  SelectInputController,
  TextAreaController,
  TextInputController,
} from "../../components/input.component";
import { type UploadProps, type UploadFile, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink } from "react-router";
import authSvc from "../../services/auth.service";

export const RegisterPage = () => {
  const RegisterDTO = Yup.object({
    fullName: Yup.string()
      .min(2, "Full name must be at least 2 characters")
      .max(50, "Full name cannot exceed 50 characters")
      .required("Full name is required"),

    username: Yup.string()
      .min(2, "Username must be at least 2 characters")
      .max(50, "Username cannot exceed 50 characters")
      .required("Username is required"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*>-])[a-zA-Z\d!@#$%^&*>-]{8,25}$/,
        "Password must be 8-25 characters, include at least one uppercase, one lowercase, one number, and one special character"
      )
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),

    role: Yup.string()
      .matches(/^(author|user)$/, "Role must be either 'author' or 'user'")
      .required("Role is required"),

    gender: Yup.string()
      .matches(
        /^(male|female|other)$/,
        "Gender must be 'male', 'female', or 'other'"
      )
      .required("Gender is required"),

    address: Yup.string().required("Address is required"),

    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),

    image: Yup.mixed().nullable().optional(),
    socialLin,

    bio: Yup.string().max(200, "Bio cannot exceed 200 characters").optional(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      role: "",
      phone: "",
      gender: "",
      bio: "",
      image: null,
      socialLinks: "",
    },
    resolver: yupResolver(RegisterDTO),
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

  const registerHandler = async(data: any) => {
    // console.log("FORM DATA:", data);
    try {
      const response = await authSvc.postRequest('/auth/register', data, { file: true });
      console.log(response)
    } catch (exception) {
      console.log(exception)
      
    }
  };

  return (
    <div className="h-full flex justify-center items-center mt-15">
      <div className="w-2/4 border-2 border-green-700 font-serif p-4 rounded-md">
        <p className="text-center text-2xl font-bold text-green-700">
          Register
        </p>
        <form
          onSubmit={handleSubmit(registerHandler, (formErrors) => {
            console.log("FORM VALIDATION ERRORS", formErrors);
          })}
        >
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <InputLabel htmlFor="fullName">Full Name</InputLabel>
              <TextInputController
                name="fullName"
                type="text"
                control={control}
                errorMsg={errors?.fullName?.message}
                classes={"w-full"}
              />
            </div>
            <div>
              <InputLabel htmlFor="username">Username</InputLabel>
              <TextInputController
                name="username"
                type="text"
                control={control}
                errorMsg={errors?.username?.message}
              />
            </div>
          </div>
          <div className="mt-2">
            <InputLabel htmlFor="email">Email</InputLabel>
            <TextInputController
              name="email"
              type="email"
              control={control}
              errorMsg={errors?.email?.message}
              classes={`w-full`}
              placeholder="example@exampl.com"
            />
          </div>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mt-3">
              <InputLabel htmlFor="password">Password</InputLabel>
              <PasswordInputController
                name="password"
                control={control}
                errorMsg={errors?.password?.message}
              />
            </div>
            <div className="mt-3">
              <InputLabel htmlFor="confirmPassword">Re-Password</InputLabel>
              <PasswordInputController
                name="confirmPassword"
                control={control}
                errorMsg={errors?.confirmPassword?.message}
                placeholder="Re-tye your password"
              />
            </div>
          </div>
          <div className="mt-2">
            <InputLabel htmlFor="address">Address</InputLabel>
            <TextAreaController
              name="address"
              control={control}
              errorMsg={errors?.address?.message}
              placeholder="Where do you belong to?"
              autoSize={{ minRows: 1, maxRows: 2 }}
            />
          </div>
          <div className="mt-2">
            <InputLabel htmlFor="phone">Phone (Mob)</InputLabel>
            <TextInputController
              name="phone"
              type="text"
              control={control}
              errorMsg={errors?.phone?.message}
              placeholder="Enter your 10 digit mobile number"
            />
          </div>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <InputLabel htmlFor="gender">Select gender</InputLabel>
              <SelectInputController
                name="gender"
                control={control}
                errorMsg={errors?.gender?.message}
                classes={`w-full`}
                options={[
                  { label: "male", value: "male" },
                  { label: "female", value: "female" },
                  { label: "other", value: "other" },
                ]}
              />
            </div>
            <div>
              <InputLabel htmlFor="role">Select role</InputLabel>
              <SelectInputController
                name="role"
                control={control}
                errorMsg={errors?.role?.message}
                classes={`w-full`}
                options={[
                  { label: "author", value: "author" },
                  { label: "reader", value: "user" },
                ]}
              />
            </div>
          </div>
          <div className="mt-2">
            <InputLabel htmlFor="bio">Bio</InputLabel>
            <TextAreaController
              name="bio"
              control={control}
              errorMsg={errors?.bio?.message}
              placeholder="Enter your bio that represents you."
            />
          </div>
          <div className="mt-3">
            <InputLabel htmlFor="socialLinks" classses="block">
              Social Media (url)
            </InputLabel>
            <TextAreaController
              name="socialLinks"
              control={control}
              errorMsg={errors?.socialLinks?.message}
              placeholder="Enter your Facebook URL here"
            />
          </div>
          <div className="mt-3">
            <InputLabel htmlFor="image" classses="block">
              Profile Image
            </InputLabel>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
          </div>
          <div className="mt-2 text-center">
            <Button
              type="primary"
              disabled={isSubmitting}
              className="bg-green-700! w-full font-bold h-9! text-[17px]!"
              htmlType="submit"
            >
              <b>Register</b>
            </Button>
          </div>
          <div className="mt-2 text-center text-sm">
            Already have an account?{" "}
            <NavLink
              to={"/"}
              className="underline text-green-800 font-semibold"
            >
              {" "}
              Sign in
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};
