import { Layout, Typography } from "antd";
import { InputLabel, TextInputController } from "../../components/input.component";
import { useForm } from "react-hook-form";

const CreateUser = () =>{
    const {handleSubmit,formState:{errors,isSubmitting},setFocus} = useForm()
    return (
        <>
        <Layout.Content className="bg-white p-8 rounded-md shadow-md">
            <div className="border-b pb-4 mb-6">
                <Typography.Title level={2}  className="!mb-0 !text-2xl font-semibold text-gray-800">User Creation</Typography.Title>
            </div>
            <div>
                <div>
                    <InputLabel htmlFor="fullName">Full Name</InputLabel>
                    <TextInputController ></TextInputController>
                </div>
            </div>
        </Layout.Content>
        </>
    )
}

export default CreateUser;
