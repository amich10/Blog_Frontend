import { Layout } from "antd";

const ProfilePage = () =>{
   return(
    <>
    <Layout.Content>
        {/* main content */}
    <main className="w-max-6xl mx-auto px-4 py-8">

        {/* profile header */}
        <div class="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div class="bg-indigo-100 h-48"></div>
            <div class="px-6 pb-6 relative">
                <div class="flex justify-between items-end -mt-16 mb-4">
                    <div class="flex items-end">
                        <div class="relative">
                            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Profile" class="w-32 h-32 rounded-full border-4 border-white">
                            <button class="absolute bottom-2 right-2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition">
                                <i class="fas fa-camera text-sm"></i>
                            </button>
                        </div>
                        <div class="ml-6 mb-4">
                            <h1 class="text-2xl font-bold text-gray-800">Jane Doe</h1>
                            <p class="text-gray-600">@janedoe</p>
                        </div>
                    </div>
                    <div class="flex space-x-3 mb-4">
                        <button class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">Follow</button>
                        <button class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition">Message</button>
                    </div>
                </div>

                <p class="text-gray-700 mb-4">Digital content creator and tech enthusiast. Writing about web development, design, and productivity tips.</p>
                
                <div class="flex flex-wrap gap-y-2 text-sm text-gray-500">
                    <div class="flex items-center mr-6">
                        <i class="fas fa-map-marker-alt mr-2"></i>
                        <span>San Francisco, CA</span>
                    </div>
                    <div class="flex items-center mr-6">
                        <i class="fas fa-link mr-2"></i>
                        <a href="#" class="text-indigo-600 hover:underline">janedoe.dev</a>
                    </div>
                    <div class="flex items-center mr-6">
                        <i class="fas fa-calendar-alt mr-2"></i>
                        <span>Joined September 2018</span>
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