import { useParams } from "react-router";

const UserProfilePage = () =>{
    const params = useParams()
    return (
        <>
        <div>
            Params: {String(params))}
        </div>
        </>
    )
}

export default UserProfilePage;