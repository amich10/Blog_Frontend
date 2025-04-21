import { useForm } from "react-hook-form"
import { InputLabel, PasswordInputController, TextInputController } from "../../components/input.component"
import { Button } from "antd"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { NavLink, useNavigate } from "react-router"
import { IUserDetails, useAuth } from "../../context/auth.context"
import notifcation, { NotificationType } from "../../utilities/helpers"
import { useEffect } from "react"



interface Icredentails {
    username:string,
    password:string
}


const HomePage = () =>{

    const {login,userDetails} = useAuth()
    const navigate= useNavigate()




    const LoginDTO = yup.object({
        username:yup.string().required(),
        password:yup.string().required()
    })

    const {handleSubmit,control, formState:{errors}} = useForm({
        defaultValues:{
            username:"",
            password:""
        } as Icredentails,
        resolver:yupResolver(LoginDTO)
    })


    const formSubmit = async (data: ICredentials) => {
        try {
            // Ensure the login function returns the user object
            let user: any = await login(data);
            
            // Check if user is valid
            if (user && user.role) {
                navigate('/' + user.role);  // Navigate to the user's role panel
                setTimeout(() => {
                    notifcation(`Welcome, ${user.username} to ${user.role} panel`, NotificationType.SUCCESS);
                }, 500);
            } else {
                // If the user object is invalid, show an error
                notifcation("Unable to retrieve user data. Please try again.", NotificationType.ERROR);
            }
        } catch (exception) {
            console.log(exception);
            notifcation("Sorry, you cannot login at this moment. Please, try again later.", NotificationType.ERROR);
        }
    };
    

    //if user is already login and when user cliks http://localhost:5173/ he shouldnot go to here without logout
    useEffect(() =>{
        if(userDetails && userDetails.role){
            navigate('/'+userDetails.role)
        }
    },[userDetails])

    return (
        <>
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit(formSubmit)}>
            <div className="w-120 bg-white rounded-md p-4 border-2 border-green-700 font-serif">
                <p className="text-center text-2xl font-bold text-green-700">Login </p>
                <div className="mt-3">
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <TextInputController type="text" name="username" control={control} errorMsg={errors?.username?.message}/>
                </div>
                <div className="mt-3">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <PasswordInputController name="password" control={control} errorMsg={errors?.password?.message}/>
                </div >
                <div className="flex  justify-between mt-3">
                    <NavLink to='/forget-password' className="text-green-700 font-bold underline">Forget Password?</NavLink>
                </div>
                <div className="mt-3">
                    <Button htmlType="submit" className="bg-[#376a63]! text-center text-white! w-full">Login</Button>
                </div>
                <div className="text-center mt-3">
                    New user?{" "}<NavLink to="/register" className="font-bold text-green-700 underline">Register here</NavLink>
                </div>
            </div>
            </form>
        </div>
        </>
    )
}

export default HomePage;