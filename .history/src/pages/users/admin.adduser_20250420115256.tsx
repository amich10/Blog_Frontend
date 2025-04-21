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
                <form onSubmit={handleSubmit(sumithandler)} className="space-y-6"></form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <InputLabel htmlFor="fullName">Full Name</InputLabel>
                            <TextInputController
                                name="fullName"
                                control={control}
                                errorMsg={errors?.fullName?.message}
                                placeholder="Enter full name here..."
                                type="text"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <TextInputController
                                name="username"
                                control={control}
                                errorMsg={errors?.username?.message}
                                placeholder="Enter username..."
                                type="text"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <TextInputController
                                name="email"
                                control={control}
                                errorMsg={errors?.email?.message}
                                placeholder="Enter email..."
                                type="email"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="phone">Phone</InputLabel>
                            <TextInputController
                                name="phone"
                                control={control}
                                errorMsg={errors?.phone?.message}
                                placeholder="Enter phone number..."
                                type="text"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <TextInputController
                                name="password"
                                control={control}
                                errorMsg={errors?.password?.message}
                                placeholder="Enter password..."
                                type="password"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                            <TextInputController
                                name="confirmPassword"
                                control={control}
                                errorMsg={errors?.confirmPassword?.message}
                                placeholder="Confirm password..."
                                type="password"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="address">Address</InputLabel>
                            <TextInputController
                                name="address"
                                control={control}
                                errorMsg={errors?.address?.message}
                                placeholder="Enter address..."
                                type="text"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="role">Role</InputLabel>
                            <TextInputController
                                name="role"
                                control={control}
                                errorMsg={errors?.role?.message}
                                placeholder="Enter role..."
                                type="text"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="gender">Gender</InputLabel>
                            <TextInputController
                                name="gender"
                                control={control}
                                errorMsg={errors?.gender?.message}
                                placeholder="Enter gender..."
                                type="text"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="bio">Bio</InputLabel>
                            <TextInputController
                                name="bio"
                                control={control}
                                errorMsg={errors?.bio?.message}
                                placeholder="Enter bio..."
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Creating..." : "Create User"}
                        </button>
                    </div>
                </form>
            </div>
        </Layout.Content>
        </>
    )
}

export default CreateUser;
