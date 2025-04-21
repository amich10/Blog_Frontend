import { Button } from "antd";
import {
  InputLabel,
  TextInputController,
} from "../../../components/input.component";
import { NavLink, useParams } from "react-router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import authSvc from "../../../services/auth.service";

const ResetPasswordPage = () => {


    const params=useParams()
    const [token,setToken] = useState<string>("")

  const resetPasswordDTO = yup.object({
    token: yup.string().required(),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*>-])[a-zA-Z\d!@#$%^&*>-]{8,25}$/,
        "Password must be 8-25 characters, include at least one uppercase, one lowercase, one number, and one special character"
      )
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      token: "",
      password: "",
      confirmPassword: "",
    },
    resolver:yupResolver(resetPasswordDTO)
  });

  const verifyToken = async() =>{
    try {
        const token = params.resetToken
        await authSvc.getRequest('auth/verify-token/'+token)
        setToken()

    } catch (exception) {
        console.log(exception)
    }
  }




  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <form onSubmit={handleSubmit()}>
          <div className="w-120 bg-white rounded-md p-4 border-2 border-green-700 font-serif">
            <p className="text-center text-2xl font-bold text-green-700">
              Reset Password
            </p>

            <div className="mt-3">
              <InputLabel htmlFor="password">New Password</InputLabel>
              <TextInputController
                type="password"
                name="password"
                control={control}
                errorMsg={errors?.newPassword?.message}
              />
            </div>

            <div className="mt-3">
              <InputLabel htmlFor="confirmPassword">
                Confirm Password
              </InputLabel>
              <TextInputController
                type="password"
                name="confirmPassword"
                control={control}
                errorMsg={errors?.confirmPassword?.message}
              />
            </div>

            <div className="mt-3">
              <Button
                htmlType="submit"
                className="bg-[#376a63]! text-center text-white! w-full"
              >
                Reset Password
              </Button>
            </div>

            <div className="text-center mt-3">
              Back to{" "}
              <NavLink to="/" className="font-bold text-green-700 underline">
                Login
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ResetPasswordPage;
