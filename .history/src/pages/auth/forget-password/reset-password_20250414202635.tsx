import { Button } from "antd";
import { InputLabel, TextInputController } from "../../../components/input.component";
import { NavLink } from "react-router";
import { useForm } from "react-hook-form";
import * as yup from "yup"

const ResetPasswordPage = () =>{

    const  

    const { control,handleSubmit,formState:{errors,isSubmitting},setValue} = useForm({
        defaultValues:{
            token:"",
            password:"",
            confirmPassword:""
        }
    })




    return (
        <>
        <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit()}>
        <div className="w-120 bg-white rounded-md p-4 border-2 border-green-700 font-serif">
          <p className="text-center text-2xl font-bold text-green-700">Reset Password</p>

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
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <TextInputController
              type="password"
              name="confirmPassword"
              control={control}
              errorMsg={errors?.confirmPassword?.message}
            />
          </div>

          <div className="mt-3">
            <Button htmlType="submit" className="bg-[#376a63]! text-center text-white! w-full">
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
    )
}

export default ResetPasswordPage;