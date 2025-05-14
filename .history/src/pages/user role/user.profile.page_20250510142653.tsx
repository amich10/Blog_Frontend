import { useParams } from "react-router";

const UserProfilePage = () =>{
    const params = useParams()
    return (
        <>
        <div>
            Params: {params.to)}
        </div>
        </>
    )
}

export default UserProfilePage;