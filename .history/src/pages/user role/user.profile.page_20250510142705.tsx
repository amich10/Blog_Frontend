import { useParams } from "react-router";

const UserProfilePage = () =>{
    const params = useParams()
    return (
        <>
        <div>
            Params: {String())}
        </div>
        </>
    )
}

export default UserProfilePage;