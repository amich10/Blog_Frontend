import { CalendarOutlined, CameraOutlined, EnvironmentOutlined, LinkOutlined} from "@ant-design/icons";
import { Layout } from "antd";
import { useAuth } from "../../../context/auth.context";


const ProfilePage = () =>{

    const {userDetails} = useAuth()
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
                        <h1 className="text-2xl font-bold text-gray-800">{userDetails.name}</h1>
                        <p className="text-gray-600">@{userDetails.username}</p>
                    </div>
                </div>
                <div className="flex space-x-3 mb-4">
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">Follow</button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition">Message</button>
                </div>
                
            </div>
            <p className="text-gray-700 mb-4 mx-2">{userDetails.bio}</p>
            <div className="flex flex-wrap mx-2 text-sm">
                <div className="flex items-center gap-x-1 mr-6">
                    <EnvironmentOutlined/>
                    <span>{userDetails.address}</span>
                </div>
                <div className="flex items-center gap-x-1 mr-6">
                    <LinkOutlined/>
                    <a href="#">{userDetails.}</a>
                </div>
                <div className="flex items-center gap-x-1 mr-6">
                    <CalendarOutlined/>
                    <span>joined september 2018</span>
                </div>
            </div>
        </div>

        {/* stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white shadow-md p-6 rounded-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Blog Posts</h3>
                <div className="flex justify-between">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-indigo-600">142</p>
                        <p className="text-gray-500 text-sm">Posts</p>
                    </div>
                    <div>
                    <p className="text-2xl font-bold text-indigo-600">142</p>
                    <p className="text-gray-500 text-sm">Followers</p>
                    </div>
                    <div>
                    <p className="text-2xl font-bold text-indigo-600">142</p>
                    <p className="text-gray-500 text-sm">Following</p>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Top Categories</h3>
                <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">Technology</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">Design</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Productivity</span>
                </div>
            </div>
        </div>
        <div>
            <h3 className="text-gray-700 text-lg font-semibold mb-2">Posts</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white shadow-md hover:shadow-lg overflow-hidden transition">
                    <img src="https://source.unsplash.com/random/400x200/?technology" alt="Blog post" className="w-full h-48 object-cover"/>
                    <div className="p-6">
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                        <span>Jun 12, 2023</span>
                        <span className="mx-2">•</span>
                        <span>8 min read</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">The Future of Web Development in 2023</h3>
                        <p className="text-gray-600 mb-4">Exploring the latest trends and technologies shaping the future of web development...</p>
                        <div className="flex justify-between items-center">
                        <div className="flex space-x-1">
                            <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">Technology</span>
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                            <i className="fas fa-heart mr-1"></i>
                            <span>142</span>
                        </div>
                    </div>
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