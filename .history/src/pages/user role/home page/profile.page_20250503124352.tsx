import { CalendarOutlined, CameraOutlined, HeatMapOutlined, LinkOutlined } from "@ant-design/icons";
import { Layout } from "antd";

const ProfilePage = () =>{
   return(
    <>
    <Layout.Content>
        {/* main content */}
    <main className="w-max-6xl mx-auto px-4 py-4 bg-white">

        {/* profile header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 border">
            {/* cover page */}
            <div className="bg-indigo-100 h-48"></div>
        {/* profile pic and buttons */}
            <div className="flex justify-between  items-end -mt-16 mb-4 mx-2">
                <div className="flex items-end">
                    <div className="relative">
                        <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="profile" className="h-32 w-32 rounded-full border-4 border-white" />
                        <button  title="edit profile pic" className="absolute bottom-2 right-2 bg-indigo-600 text-white p-2 rounded-full"><CameraOutlined/></button>
                    </div>
                    <div className="ml-6 mb-4">
                        <h1 className="text-2xl font-bold text-gray-800">Jane Doe</h1>
                        <p className="text-gray-600">@janedoe</p>
                    </div>
                </div>
                <div className="flex space-x-3 mb-4">
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">Follow</button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition">Message</button>
                </div>
                
            </div>
            <p className="text-gray-700 mb-4 mx-2">Digital content creator and tech enthusiast. Writing about web development, design, and productivity tips.</p>
            <div className="flex flex-wrap gap-y-4">
                <div className="flex items-center mr-6">
                    <HeatMapOutlined/>
                    <span>San francisco,CA</span>
                </div>
                <div className="flex items-center mr-6">
                    <LinkOutlined/>
                    <a href="#">janedoe.com</a>
                </div>
                <div>
                    <CalendarOutlined/>
                    <span>joined september 2018</span>
                </div>
            </div>
        </div>



    </main>

    </Layout.Content>
    </>
   )
}

export default ProfilePage;