import { useParams } from "react-router";

const UserProfilePage = () =>{
    const params = useParams()
    return (
        <>
        <div>
            Params: {JSON.stringify(params.)}
        </div>
        </>
    )
}

export default UserProfilePage;