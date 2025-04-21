import { useParams } from "react-router";
import userSvc from "../../services/user.service";
import notifcation, { NotificationType } from "../../utilities/helpers";
import { useState } from "react";

const UserEdit = () => {
  const params = useParams();
  const [userDatata,setUserData] = useState
  const getUsers = async () => {
    try {
      const user = await userSvc.getRequest("/user/" + params.id);
      console.log(user);
    } catch (exception) {
      notifcation(
        "Sorry the requested users cannot be retrieved now.Please try again later.",
        NotificationType.ERROR
      );
    }
  };

  return <></>;
};
export default UserEdit;
