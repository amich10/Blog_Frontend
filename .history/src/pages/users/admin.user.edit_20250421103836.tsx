import { useParams } from "react-router"
import userSvc from "../../services/user.service"
import notifcation, { NotificationType } from "../../utilities/helpers"

const UserEdit = () => {
    const params = useParams()
    const getUsers = async() =>{
        try {
            const user = await userSvc.getRequest('/user'+id)
            console.log(user)
        } catch (exception) {
            notifcation("Sorry the requested users cannot be retrieved now.Please try again later.",NotificationType.ERROR)
        }
    }


    return (
        <>
        
        </>
    )
}
export default UserEdit