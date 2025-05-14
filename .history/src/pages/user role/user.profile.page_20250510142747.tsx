import { useParams } from "react-router";

const UserProfilePage = () =>{
    const params = useParams()
    return (
        <>
        <div>
            Params: {JSON.stringify(params.id)}
        </div>
        </>
    )
}

export default UserProfilePage;