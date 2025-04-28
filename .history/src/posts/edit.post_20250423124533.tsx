import postSvc from "../services/post.service"
import notifcation from "../utilities/helpers"

const EditPost = () =>{



    const getPostById = async() =>{
        try {
            const postDetail = await postSvc.getRequest('/')
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