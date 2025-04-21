import { Layout, Typography } from "antd";
import { InputLabel, PasswordInputController, RegisterDTO, TextInputController } from "../../components/input.component";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Password from "antd/es/input/Password";

const CreateUser = () =>{
    const {handleSubmit,formState:{errors,isSubmitting},setValue,control} = useForm({
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
            socialLinks: []
        },
        resolver:yupResolver(RegisterDTO)
    });

    
    const sumithandler = (data:any) =>{
        try {
            
        } catch (exception) {
            
        }
    }

    return (
        <>
        <Layout.Content className="bg-white p-8 rounded-md shadow-md">
            <div className="border-b pb-4 mb-6">
                <Typography.Title level={2}  className="!mb-0 !text-2xl font-semibold text-gray-800">User Creation</Typography.Title>
            </div>
            <div>
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                    <InputLabel htmlFor="fullName" classses={' w-full sm:w-1/3'}>Full Name</InputLabel>
                    <TextInputController  classes={'w -full sm:w-2/3'} name="fullName" control={control} errorMsg={errors?.fullName?.message} placeholder="Enter full name here..." type="text"></TextInputController>
                </div>
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                    <InputLabel htmlFor="username" classses={' w-full sm:w-1/3'}>Username</InputLabel>
                    <TextInputController  classes={'w -full sm:w-2/3'} name="username" control={control} errorMsg={errors?.username?.message} placeholder="Enter your username here..." type="text"></TextInputController>
                </div>
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                    <InputLabel htmlFor="password" classses={' w-full sm:w-1/3'}>Password</InputLabel>
                    <PasswordInputController classes={'w-full sm:w-2/3'}  name="password" control={control} errorMsg={errors?.password?.message} type="text"/>
                </div>
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                    <InputLabel htmlFor="confirmPassword" classses={' w-full sm:w-1/3'}>Re-Password</InputLabel>
                    <PasswordInputController classes={'w-full sm:w-2/3'}  name="confirmPassword" control={control} errorMsg={errors?.confirmPasswordpassword?.message} type="text"/>
                </div>
            </div>
        </Layout.Content>
        </>
    )
}

export default CreateUser;
