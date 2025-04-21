import { useNavigate, useParams } from "react-router";
import userSvc from "../../services/user.service";
import notifcation, { NotificationType } from "../../utilities/helpers";
import { useEffect, useState } from "react";
import { Layout, Spin, Typography } from "antd";
import * as Yup from "yup"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const UserEdit = () => {
  const params = useParams();
  const [userDatata,setUserData] = useState<any>()
  const navigate= useNavigate()

    const createUserSchema = Yup.object({
            fullName: Yup.string().min(2, "Full Name must be at least 2 characters").max(50, "Full Name cannot exceed 50 characters").required("Full Name is required"),
            username: Yup.string().min(2, "Username must be at least 2 characters").max(50, "Username cannot exceed 50 characters").required("Username is required"),
            email: Yup.string().email("Invalid email format").required("Email is required"),
            password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
            address: Yup.string().max(100, "Address cannot exceed 100 characters").required("Address is required"),
            role: Yup.string().required(),
            status: Yup.string().required(),
            gender: Yup.string().required(),
            phone: Yup.string()
                .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
                .required("Phone number is required"),
            bio: Yup.string().max(200, "Bio cannot exceed 200 characters"),
            image: Yup.mixed().nullable(),
            socialLinks:Yup.string().url("Invalid URL format").optional(),
        });
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
          status:"",
          role: "",
          phone: "",
          gender: "",
          bio: "",
          image: null,
          socialLinks: "",
        },
        resolver: yupResolver(createUserSchema),
      });











  const getUserById = async () => {
    try {
      const user = await userSvc.getRequest("/user/" + params.id);
      console.log(user);
      setUserData(user.result.data)
    } catch (exception) {
      notifcation(
        "Sorry the requested users cannot be retrieved now.Please try again later.",
        NotificationType.ERROR
      );
      navigate('/admin/users')
      
    }
  };

  const editUserById = async(data:any) =>{
    try {
        await userSvc.patchRequest('/user/'+params.id,data,{file:true})
        notifcation('User details edited succesfully',NotificationType.SUCCESS)
        navigate('/admin/users')
    } catch (exception) {
        console.log(exception)
        notifcation("User detail cannot be edited at this time.Please try again later",NotificationType.ERROR)
        navigate('/admin/users')

    }
  }

  useEffect(() =>{
    getUserById()
  },[])

  return(
    <>
    <Layout.Content className=" rounded-md p-5">
        <div className=" border-b border-b-gray-500">
            <Typography.Title className="text-center text-white! bg-violet-600 text-3xl p-2 rounded-md "> <PlusOutlined/> Edit category</Typography.Title>
        </div>
        <div className="mt-3">
           {loading ? <Spin fullscreen></Spin> : <CategoryForm   submitEvent={editcategory} category={categoryData}/>}
        </div>
        </Layout.Content>
    </>
  );
};
export default UserEdit;
