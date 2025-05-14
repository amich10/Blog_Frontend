import {
  CalendarOutlined,
  EditOutlined,
  EnvironmentOutlined,
  LikeOutlined,
  LinkOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Button, Layout } from "antd";
import { useAuth } from "../../../context/auth.context";
import postSvc from "../../../services/post.service";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import notifcation, { NotificationType } from "../../../utilities/helpers";
import EditPro

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
  const [editModalVisible, setEditModalVisible] = useState(false);

  const handleSaveProfile = async () => {
    try {
      // Here you would typically make an API call to update the profile
      // For example:
      // const formData = new FormData();
      // formData.append('fullName', values.fullName);
      // formData.append('userName', values.userName);
      // ... other fields
      // if (values.profileImage) formData.append('profileImage', values.profileImage);
      // if (values.coverImage) formData.append('coverImage', values.coverImage);

      // const response = await userSvc.updateProfile(formData);
      // Update userDetails in your auth context

      notifcation("Profile updated successfully!", NotificationType.SUCCESS);
      setEditModalVisible(false);
    } catch (error) {
      notifcation(
        "Failed to update profile. Please try again.",
        NotificationType.ERROR
      );
    }
  };

  const postsByUser = async () => {
    try {
      const posts = await postSvc.getRequest(`post/${userDetails._id}/posts`);
      setPosts(posts.result.data);
    } catch (exception) {
      console.log(exception);
      throw exception;
    }
  };

  useEffect(() => {
    postsByUser();
  }, []);
  return (
    <>
      <Layout.Content>
        {/* main content */}
        <main className="w-max-6xl mx-auto px-4 py-4 bg-white">
          {/* profile header */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            {/* cover page */}
            <div className="bg-indigo-100 h-48 relative">
              {userDetails.coverImage?.optimizedUrl ? (
                <img
                  src={userDetails.coverImage.optimizedUrl}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>

            <div className="flex justify-between  items-end -mt-16 mb-4 mx-2">
              <div className="flex items-end">
                <div className="relative">
                  <img
                    src={userDetails.image.optimizedUrl}
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
                    {userDetails.name}
                  </h1>
                  <p className="text-[#4f6f52]">@{userDetails.username}</p>
                </div>
              </div>
              <div className="flex mb-4">
                <Button
                  onClick={() => setEditModalVisible(true)}
                  className="bg-[#4f6f52]! text-white! rounded-xl!"
                >
                  {" "}
                  <EditOutlined className="mr-1!" />
                  Edit Profile
                </Button>
                <EditProfileModal
                  visible={editModalVisible}
                  onCancel={() => setEditModalVisible(false)}
                  onSave={handleSaveProfile}
                  userDetails={userDetails}
                />
              </div>
            </div>
            <p className="mb-4 mx-2">{userDetails.bio}</p>
            <div className="flex flex-wrap mx-2 text-sm mb-1">
              <div className="flex items-center gap-x-1 mr-6">
                <EnvironmentOutlined />
                <span>{userDetails.address}</span>
              </div>
              <div className="flex items-center gap-x-1 mr-6">
                <LinkOutlined />
                <a href={userDetails?.socialMedia}>
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

          {/* stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white shadow-sm p-6 rounded-md">
              <h3 className="text-lg font-bold text-[#4f6f52] mb-2">Stats</h3>
              <div className="flex justify-between">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#4f6f52]">
                    {posts.length}
                  </p>
                  <p className="text-gray-500 text-sm">Posts</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#4f6f52]">
                    {userDetails.followers?.length}
                  </p>
                  <p className="text-gray-500 text-sm">Followers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#4f6f52]">
                    {userDetails.following?.length}
                  </p>
                  <p className="text-gray-500 text-sm">Following</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-[#4f6f52] mb-2">
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {[...new Set(posts.map((post) => post.categoryId.title))].map(
                  (category) => (
                    <span
                      key={category}
                      className={`px-3 py-1 text-sm rounded-full bg-[#4f6f52] text-white`}
                    >
                      {category}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-[#4f6f52] text-xl font-bold mb-2">Posts</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white shadow-md hover:shadow-lg hover:cursor-pointer overflow-hidden transition rounded-xl"
                  onClick={() => navigate("/blogs/" + post.slug)}
                >
                  <img
                    src={post.images?.[0]?.optimizedUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                      <span className="mx-2">•</span>
                      <span>
                        {Math.max(
                          1,
                          Math.round((post.content.length || 500) / 200)
                        )}{" "}
                        min read
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-[#4f6f52] mb-2">
                      {post.title}
                    </h3>
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
                          <span>
                            <LikeOutlined />
                          </span>
                          <span className="ml-1">{post.likesCount}</span>
                        </div>
                        <div>
                          <span>
                            <MessageOutlined />
                          </span>
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
  );
};

export default ProfilePage;
