import { Layout, Typography } from "antd";
import { InputLabel, PasswordInputController, RegisterDTO, SelectInputController, TextAreaController, TextInputController } from "../../components/input.component";
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
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
                    <InputLabel htmlFor="fullName" classses={' w-full sm:w-1/3'}>Full Name</InputLabel>
                    <TextInputController  classes={'w -full sm:w-2/3'} name="fullName" control={control} errorMsg={errors?.fullName?.message} placeholder="full name" type="text"></TextInputController>
                </div>
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
                    <InputLabel htmlFor="username" classses={' w-full sm:w-1/3'}>Username</InputLabel>
                    <TextInputController  classes={'w -full sm:w-2/3'} name="username" control={control} errorMsg={errors?.username?.message} placeholder="username" type="text"></TextInputController>
                </div>
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
                    <InputLabel htmlFor="username" classses={' w-full sm:w-1/3'}>Email</InputLabel>
                    <TextInputController  classes={'w -full sm:w-2/3'} name="email" control={control} errorMsg={errors?.username?.message} placeholder="example@example.com" type="email"></TextInputController>
                </div>
                
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
                    <InputLabel htmlFor="password" classses={' w-full sm:w-1/3'}>Password</InputLabel>
                    <PasswordInputController classes={'w-full sm:w-2/3'}  name="password" control={control} errorMsg={errors?.password?.message}/>
                </div>
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
                    <InputLabel htmlFor="confirmPassword" classses={' w-full sm:w-1/3'}>Re-Password</InputLabel>
                    <PasswordInputController classes={'w-full sm:w-2/3'}  name="confirmPassword" control={control} errorMsg={errors?.confirmPassword?.message}/>
                </div>
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
                    <InputLabel htmlFor="phone" classses={' w-full sm:w-1/3'}>Phone (mob)</InputLabel>
                    <TextInputController classes={'w-full sm:w-2/3'}  name="phone" control={control} errorMsg={errors?.phone?.message} placeholder="10 digit mob-number"/>
                </div>
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
                    <InputLabel htmlFor="address" classses={' w-full sm:w-1/3'}>Address</InputLabel>
                    <TextInputController classes={'w-full sm:w-2/3'}  name="address" control={control} errorMsg={errors?.address?.message} placeholder="Where do you live?"/>
                </div>
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
                    <InputLabel htmlFor="role" classses={'w-full sm:w-1/3'}>Select a Role</InputLabel>
                    <SelectInputController options={[
                        {label:'admin',value:'admin'},
                        {label:'author',value:'author'},
                        {label:'reader',value:'user'},
                    ]}
                    name="role"
                    control={control}
                    errorMsg={errors?.role?.message}
                    classes={'w-full sm:w-2/3'}
                    />    
                </div>
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
                    <InputLabel htmlFor="role" classses={'w-full sm:w-1/3'}>Select a Role</InputLabel>
                    <SelectInputController options={[
                        {label:'admin',value:'admin'},
                        {label:'author',value:'author'},
                        {label:'reader',value:'user'},
                    ]}
                    name="role"
                    control={control}
                    errorMsg={errors?.role?.message}
                    classes={'w-full sm:w-2/3'}
                    />    
                </div>                 

            </div>
        </Layout.Content>
        </>
    )
}

export default CreateUser;
