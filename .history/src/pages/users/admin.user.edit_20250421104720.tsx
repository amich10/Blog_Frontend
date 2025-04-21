import { useNavigate, useParams } from "react-router";
import userSvc from "../../services/user.service";
import notifcation, { NotificationType } from "../../utilities/helpers";
import { useEffect, useState } from "react";
import { Layout, Spin } from "antd";

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
           {loading ? <Spin fullscreen></Spin> : <CategoryForm submitEvent={editcategory} category={categoryData}/>}
        </div>
        </Layout.Content>
    </>
  );
};
export default UserEdit;
