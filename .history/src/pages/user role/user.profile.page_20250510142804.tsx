import { useParams } from "react-router";

const UserProfilePage = () =>{
    const params = useParams()
     Params: {JSON.stringify(params.id)}
    return (
        <>
        <div>
           
        </div>
        </>
    )
}

export default UserProfilePage;