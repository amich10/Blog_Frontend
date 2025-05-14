import { CalendarOutlined, EditOutlined, EnvironmentOutlined, LikeOutlined, LinkOutlined, MessageFilled, MessageOutlined} from "@ant-design/icons";
import { Button, Layout } from "antd";
import { useAuth } from "../../../context/auth.context";
import postSvc from "../../../services/post.service";
import { use, useEffect, useState } from "react";

interface IPost {
    _id: string;
    title: string;
    slug: string;
    content: string;
    tags: string[];
    categoryId: {
        _id: string;
        title: string;
    };
    authorId: {
        _id: string;
        fullName: string;
        username: string;
    };
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
                        <button  title="edit profile pic" className="absolute bottom-2 right-2 bg-[#4f6f52] text-white p-2 rounded-full"><EditOutlined/></button>
                    </div>
                    <div className="ml-6 mb-4">
                        <h1 className="text-xl font-bold text-[#4f6f52]">{userDetails.name}</h1>
                        <p className="text-[#4f6f52]">@{userDetails.username}</p>
                    </div>
                </div>
                <div className="flex mb-4">
                      <Button className="bg-"> <EditOutlined className="mr-1!"/>Edit Profile</Button>
                </div>
                
            </div>
            <p className="text-[#4f6f52] mb-4 mx-2">{userDetails.bio}</p>
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
                <h3 className="text-lg font-bold text-[#4f6f52] mb-2">Blog Posts</h3>
                <div className="flex justify-between">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-[#4f6f52]">{posts.length}</p>
                        <p className="text-gray-500 text-sm">Posts</p>
                    </div>
                    <div>
                    <p className="text-2xl font-bold text-[#4f6f52]">{userDetails.followers?.length}</p>
                    <p className="text-gray-500 text-sm">Followers</p>
                    </div>
                    <div>
                    <p className="text-2xl font-bold text-[#4f6f52]">{userDetails.following?.length}</p>
                    <p className="text-gray-500 text-sm">Following</p>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-[#4f6f52] mb-2">Top Categories</h3>
                <div className="flex flex-wrap gap-2">
                    {[...new Set(posts.map(post => post.categoryId.title))]
                        .map((category) => (
                            <span
                                key={category}
                                className={`px-3 py-1 text-sm rounded-full bg-[#4f6f52] text-white`}
                            >
                                {category}
                            </span>
                        ))}
                </div>
            </div>
        </div>
        <div>
            <h3 className="text-[#4f6f52] text-xl font-bold mb-2">Posts</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {posts.map((post) => (
                    <div key={post._id} className="bg-white shadow-md hover:shadow-lg overflow-hidden transition">
                        <img
                            src={post.images?.[0]?.optimizedUrl}
                            alt={post.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                                <span>{new Date (post.createdAt).toLocaleDateString()}</span>
                                <span className="mx-2">•</span>
                                <span>{Math.max(1, Math.round((post.content.length || 500) / 200))} min read</span>
                            </div>
                            <h3 className="text-xl font-bold text-[#4f6f52] mb-2">{post.title}</h3>
                            <p className="text-gray-600 mb-4">{post.excerpt}</p>
                            <div className="flex justify-between items-center">
                                <div className="flex space-x-1">
                                    {post.tags.map((tag) => (
                                        <span key={tag} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">{tag}</span>
                                    ))}
                                </div>
                                 <div className="flex gap-4">
                                    <div >
                                        <span><LikeOutlined/></span>
                                        <span className="ml-1">{post.likesCount}</span>
                                    </div>
                                    <div>
                                        <span><MessageOutlined/></span>
                                        <span className="ml-1">{post.commentsCount}</span>
                                    </div>
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