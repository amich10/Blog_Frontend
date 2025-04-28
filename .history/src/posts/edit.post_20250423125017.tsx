import { useParams } from "react-router"
import postSvc from "../services/post.service"
import notifcation from "../utilities/helpers"
import { useState } from "react"

const EditPost = () =>{

    

    const params = useParams()
    const[postDetail,setPostDetail] = useState<>()

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