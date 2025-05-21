import { useForm } from "react-hook-form";
import {
  InputLabel,
  PasswordInputController,
  TextInputController,
} from "../../components/input.component";
import { Button } from "antd";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../../context/auth.context";
import notifcation, { NotificationType } from "../../utilities/helpers";
import { useEffect, useState } from "react";
interface Icredentails {
  username: string;
  password: string;
}

const HomePage = () => {
  const { login, userDetails } = useAuth();
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();

  const LoginDTO = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    } as Icredentails,
    resolver: yupResolver(LoginDTO),
  });

  const formSubmit = async (data: Icredentails) => {
    setLoading(true)
    try {
      let user: any = await login(data);
      navigate(user.role === "admin" ? "/admin" : "/blogs");
      console.log(user.role);
      notifcation(
        `Welcome, ${user.username} to ${user.role} pannel`,
        NotificationType.SUCCESS
      );
    } catch (exception) {
      console.log(exception);
      notifcation(
        "Sorry, you cannot login at this moment.Please,try again later.",
        NotificationType.ERROR
      );
    } finally {
      setLoading(false)
    }
  };

  //if user is already login and when user cliks http://localhost:5173/ he shouldnot go to here without logout
  useEffect(() => {
    if (userDetails && userDetails.role) {
      navigate(userDetails.role === "admin" ? "/admin" : "/blogs");
    }
  }, [userDetails]);

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        
      </div>
    </>
  );
};

export default HomePage;
