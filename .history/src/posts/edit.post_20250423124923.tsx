import { useParams } from "react-router"
import postSvc from "../services/post.service"
import notifcation from "../utilities/helpers"

const EditPost = () =>{

    const params = useParams()

    const getPostById = async() =>{
        try {
            const postDetail = await postSvc.getRequest('/post'+params.id)
            
        } catch (exception) {
            throw exception
        }
    }


return (
    <>
 
    </>
)
}
export default EditPost