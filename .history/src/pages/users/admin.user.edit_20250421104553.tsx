import { useNavigate, useParams } from "react-router";
import userSvc from "../../services/user.service";
import notifcation, { NotificationType } from "../../utilities/helpers";
import { useState } from "react";

const UserEdit = () => {
  const params = useParams();
  const [userDatata,setUserData] = useState<any>()
  const navigate= useNavigate()

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
        notifcation("User detail cannot be edited at this time.Please try again later",notifcation)
    }
  }

  return <></>;
};
export default UserEdit;
