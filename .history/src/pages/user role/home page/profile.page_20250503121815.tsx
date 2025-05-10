import { CameraOutlined } from "@ant-design/icons";
import { Layout } from "antd";

const ProfilePage = () =>{
   return(
    <>
    <Layout.Content>
        {/* main content */}
    <main className="w-max-6xl mx-auto px-4 py-4 bg-white">

        {/* profile header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 border">
            <div className="bg-indigo-100 h-48"></div>

            <div className="px-6 pb-6 relative">
                <div className="flex items-end">
                    <div className="relative bg-red-400">
                        <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="profile" className="h-32 w-32 rounded-full border-4 border-white" />
                        <button  title="edit profile pic" className="absolute bottom-2 right-2 bg-indigo-600 text-white p-2 rounded-full"><CameraOutlined/></button>
                    </div>
                    <div className="">
                        <h1 className="text-exl">Jane Doe</h1>
                        <p>@janedoe</p>
                    </div>
                </div>
                
            </div>
        </div>



    </main>

    </Layout.Content>
    </>
   )
}

export default ProfilePage;