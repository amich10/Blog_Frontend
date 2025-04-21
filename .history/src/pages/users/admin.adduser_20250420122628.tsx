import { Layout, Typography } from "antd";
import { InputLabel, RegisterDTO, TextInputController } from "../../components/input.component";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

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
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-4">
                    <InputLabel htmlFor="fullName" classses={'w-1/4'}>Full Name</InputLabel>
                    <TextInputController classes={'w-3/4'} name="fullName" control={control} errorMsg={errors?.fullName?.message} placeholder="Enter full name here..." type="text"></TextInputController>
                </div>
            </div>
        </Layout.Content>
        </>
    )
}

export default CreateUser;
