import { CalendarOutlined, CameraOutlined, EditOutlined, EnvironmentOutlined, LikeOutlined, LinkOutlined, MessageOutlined} from "@ant-design/icons";
import { Layout } from "antd";
import { useAuth } from "../../../context/auth.context";
import postSvc from "../../../services/post.service";
import { use, useEffect, useState } from "react";

interface IPost {
    _id: string;
    title: string;
    slug: string;
    content: string;
    tags: string[];
    categoryId: string;
    authorId: string;
    status: string;
    views: number;
    likes: string[];
    commentsCount: number;
    publishedAt: string | null;
    images: {
        url: string;
        optimizedUrl: string;
        _id: string;
    }[];
    updatedBy: string | null;
    excerpt: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    lastViewedAt: string;
    likesCount: number;
}

const ProfilePage = () =>{

    const {userDetails} = useAuth()
    console.log(userDetails)

    const [posts,setPosts] = useState<IPost[]>([])

    const postsByUser = async() =>{
        try {
            const posts = await postSvc.getRequest(`post/${userDetails._id}/posts`)
            setPosts(posts.result.data)
        } catch (exception) {
            throw exception
        }
    }

    useEffect(() =>{
        postsByUser()
    },[])
   return(
    <>
    <Layout.Content>
        {/* main content */}
    <main className="w-max-6xl mx-auto px-4 py-4 bg-white">

        {/* profile header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            {/* cover page */}
            <div className="bg-indigo-100 h-48">
              <img src="  {userDetails.image.optimizedUrl}" alt="" />
            </div>
        {/* profile pic and buttons */}
            <div className="flex justify-between  items-end -mt-16 mb-4 mx-2">
                <div className="flex items-end">
                    <div className="relative">
                        <img src={userDetails.image.optimizedUrl} alt="profile" className="h-32 w-32 rounded-full border-4 border-white" />
                        <button  title="edit profile pic" className="absolute bottom-2 right-2 bg-indigo-600 text-white p-2 rounded-full"><EditOutlined/></button>
                    </div>
                    <div className="ml-6 mb-4">
                        <h1 className="text-xl font-bold text-gray-800">{userDetails.name}</h1>
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
                    <a href="#">janedoe.com</a>
                </div>
                <div className="flex items-center gap-x-1 mr-6">
                    <CalendarOutlined/>
                    <span>{new Date(userDetails.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
        </div>

        {/* stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white shadow-md p-6 rounded-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Blog Posts</h3>
                <div className="flex justify-between">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-indigo-600">{posts.length}</p>
                        <p className="text-gray-500 text-sm">Posts</p>
                    </div>
                    <div>
                    <p className="text-2xl font-bold text-indigo-600">{userDetails.followers?.length}</p>
                    <p className="text-gray-500 text-sm">Followers</p>
                    </div>
                    <div>
                    <p className="text-2xl font-bold text-indigo-600">{userDetails.following?.length}</p>
                    <p className="text-gray-500 text-sm">Following</p>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <h3 className="text-gray-700 text-lg font-semibold mb-2">Posts</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {posts.map((post) => (
                    <div key={post._id} className="bg-white shadow-md hover:shadow-lg overflow-hidden transition">
                        <img
                            src={post.images?.[0]?.optimizedUrl || "https://source.unsplash.com/random/400x200/?technology"}
                            alt={post.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                <span className="mx-2">•</span>
                                <span>{Math.max(1, Math.round((post.content.length || 500) / 200))} min read</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
                            <p className="text-gray-600 mb-4">{post.excerpt}</p>
                            <div className="flex justify-between items-center">
                                <div className="flex space-x-1">
                                    {post.tags.map((tag) => (
                                        <span key={tag} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">{tag}</span>
                                    ))}
                                </div>
                                <div className="flex items-center text-gray-500 text-sm">
                                    <span className="mr-1"><LikeOutlined/></span>
                                    <span>{post.likesCount}</span>
                                </div>
                                <div>
                                    <span><MessageOutlined/></span>
                                    <span>{}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
                </div>
            




    </main>

    </Layout.Content>
    </>
   )
}

export default ProfilePage;