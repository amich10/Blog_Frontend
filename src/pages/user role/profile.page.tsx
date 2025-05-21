import {
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
  EnvironmentOutlined,
  LikeOutlined,
  LinkOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Button, Layout } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/auth.context";
import postSvc from "../../services/post.service";
import notifcation, { NotificationType } from "../../utilities/helpers";

export interface IPost {
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

const ProfilePage = () => {
  const { userDetails } = useAuth();
  const navigate = useNavigate();

  const [posts, setPosts] = useState<IPost[]>([]);

  const postsByUser = async () => {
    try {
      if (userDetails?._id) {
        const posts = await postSvc.getRequest(`post/${userDetails._id}/posts`);
        setPosts(posts.result.data);
      }
    } catch (exception) {
      console.error(exception);
    }
  };

  useEffect(() => {
    postsByUser();
  }, [userDetails]);

  if (!userDetails) {
    return <div className="text-center py-8 text-lg text-gray-600">Loading profile...</div>;
  }

  return (
    <Layout.Content>
      <main className="w-max-6xl mx-auto px-4 py-4 bg-white">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          {/* Cover Image */}
          <div className="bg-indigo-100 h-48 relative">
            {userDetails.coverImage?.optimizedUrl && (
              <img
                src={userDetails.coverImage.optimizedUrl}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Profile Section */}
          <div className="flex justify-between items-end -mt-16 mb-4 mx-2">
            <div className="flex items-end">
              <div className="relative">
                <img
                  src={userDetails.image?.optimizedUrl}
                  alt="profile"
                  className="h-32 w-32 rounded-full border-4 border-white"
                />
                <button
                  type="button"
                  title="edit profile pic"
                  className="absolute bottom-2 right-2 bg-[#4f6f52] text-white p-2 rounded-full"
                >
                  <EditOutlined />
                </button>
              </div>
              <div className="ml-6 mb-4">
                <h1 className="text-xl font-bold text-[#4f6f52]">
                  {userDetails.fullName}
                </h1>
                <p className="text-[#4f6f52]">@{userDetails.username}</p>
              </div>
            </div>
            <div className="flex mb-4">
              <Button
                onClick={() => navigate("/blogs/profile-edit")}
                className="bg-[#4f6f52]! text-white! rounded-xl!"
              >
                <EditOutlined className="mr-1!" />
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Bio */}
          <p className="mb-4 mx-2">{userDetails.bio}</p>

          {/* Meta Info */}
          <div className="flex flex-wrap mx-2 text-sm mb-1">
            <div className="flex items-center gap-x-1 mr-6">
              <EnvironmentOutlined />
              <span>{userDetails.address}</span>
            </div>
            <div className="flex items-center gap-x-1 mr-6">
              <LinkOutlined />
              <a href={userDetails?.socialMedia} target="_blank" rel="noopener noreferrer">
                {userDetails?.socialMedia}
              </a>
            </div>
            <div className="flex items-center gap-x-1 mr-6">
              <CalendarOutlined />
              <span>
                {new Date(userDetails.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white shadow-sm p-6 rounded-md">
            <h3 className="text-lg font-bold text-[#4f6f52] mb-2">Stats</h3>
            <div className="flex justify-between">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#4f6f52]">{posts.length}</p>
                <p className="text-gray-500 text-sm">Posts</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#4f6f52]">
                  {userDetails.followers?.length || 0}
                </p>
                <p className="text-gray-500 text-sm">Followers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#4f6f52]">
                  {userDetails.following?.length || 0}
                </p>
                <p className="text-gray-500 text-sm">Following</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold text-[#4f6f52] mb-2">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {[...new Set(posts.map((post) => post.categoryId.title))].map((category) => (
                <span
                  key={category}
                  className="px-3 py-1 text-sm rounded-full bg-[#4f6f52] text-white"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Posts */}
        <div>
          <h3 className="text-[#4f6f52] text-xl font-bold mb-2">Posts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white shadow-md hover:shadow-lg hover:cursor-pointer overflow-hidden transition rounded-xl relative"
              >
                <img
                  src={post.images?.[0]?.optimizedUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                  onClick={() => navigate("/blogs/" + post.slug)}
                />
                <div className="p-6" onClick={() => navigate("/blogs/" + post.slug)}>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                    <div>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>
                        {Math.max(1, Math.round((post.content.length || 500) / 200))} min read
                      </span>
                    </div>
                    <div className="z-100">
                      <Button
                        size="small"
                        icon={<EditOutlined />}
                        type="text"
                        className="text-[#4f6f52]!"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/blogs/edit/${post.slug}`);
                        }}
                      />
                      <Button
                        size="small"
                        type="text"
                        className="text-red-500!"
                        icon={<DeleteOutlined />}
                        onClick={async (e) => {
                          e.stopPropagation();
                          try {
                            await postSvc.deleteRequest(`post/delete/${post._id}`);
                            setPosts(posts.filter((p) => p._id !== post._id));
                            notifcation("post deleted successfully", NotificationType.SUCCESS);
                          } catch (err) {
                            notifcation("post cannot be deleted now", NotificationType.ERROR);
                            console.error(err);
                          }
                        }}
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#4f6f52] mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-1">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <LikeOutlined />
                        <span className="ml-1">{post.likesCount}</span>
                      </div>
                      <div>
                        <MessageOutlined />
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
  );
};

export default ProfilePage;
