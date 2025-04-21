import { useForm } from "react-hook-form";
import { Button } from "antd";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink } from "react-router"; // ✅ fixed import from "react-router-dom"
import { InputLabel, TextInputController } from "../../../components/input.component";
import authSvc from "../../../services/auth.service";

interface IForgetPasswordDTO {
  email: string;
}

export const ForgetPasswordPage = () => {
  // ✅ Schema validation
  const forgetPasswordSchema = yup.object({
    email: yup.string().email("Invalid email format").required("Email is required"),
  });

  // ✅ Typed form setup
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IForgetPasswordDTO>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(forgetPasswordSchema),
  });

  const onSubmit = (data: IForgetPasswordDTO) => {
    //console.log("Forgot password submitted:", data);
    try {
      const response = await authSvc.postRequest('auth/forget-password')
    } catch (exception) {
      
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-120 bg-white rounded-md p-4 border-2 border-green-700 font-serif">
          <p className="text-center text-2xl font-bold text-green-700">Forgot Password</p>

          <div className="mt-3">
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <TextInputController
              type="email"
              name="email"
              control={control}
              errorMsg={errors?.email?.message}
            />
          </div>

          <div className="mt-3">
            <Button htmlType="submit" className="bg-[#376a63]! text-center text-white! w-full">
              Send Reset Link
            </Button>
          </div>

          <div className="text-center mt-3">
            Remembered password?{" "}
            <NavLink to="/" className="font-bold text-green-700 underline">
              Go back to login
            </NavLink>
          </div>
        </div>
      </form>
    </div>
  );
};
export default ForgetPasswordPage;