import { useParams } from "react-router";

const UserProfilePage = () =>{
    const params = useParams()
    return (
        <>
        <div>
            Params: {params.toString())}
        </div>
        </>
    )
}

export default UserProfilePage;