import {
  CalendarOutlined,
  EditOutlined,
  EnvironmentOutlined,
  LikeOutlined,
  LinkOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Button, Layout } from "antd";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth.context";
import postSvc from "../../../services/post.service";
import userSvc from "../../../services/user.service";
import notifcation, { NotificationType } from "../../../utilities/helpers";


interface IUser {
  image: {
    url: string;
    optimizedUrl: string;
  };
  _id: string;
  fullName: string;
  username: string;
  email: string;
  password: string;
  gender: string;
  role: string;
  phone: string;
  address: string;
  bio: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  followers: string[];
  following: string[];
}

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
  const { id } = useParams();
  const navigate = useNavigate();

  const isViewingOwnProfile = !id || id === userDetails?._id;

  const [userData, setUserData] = useState<IUser | undefined>(
    isViewingOwnProfile && userDetails
      ? ({
          ...userDetails,
          fullName: userDetails.fullName ?? "",
          password: userDetails.password ?? "",
          gender: userDetails.gender ?? "",
          updatedAt: userDetails.updatedAt ?? "",
          __v: (userDetails as any).__v ?? 0,
          followers: userDetails.followers ?? [],
          following: userDetails.following ?? [],
        } as IUser)
      : undefined
  );
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [posts, setPosts] = useState<IPost[]>([]);

  const postsByUser = async () => {
    try {
      const userId = isViewingOwnProfile ? userDetails._id : id;
      const posts = await postSvc.getRequest(`post/${userId}/posts`);
      setPosts(posts.result.data);
    } catch (exception) {
      console.error(exception);
    }
  };

  const retrieveUserDetail = async () => {
    try {
      if (!isViewingOwnProfile && id) {
        const user = await postSvc.getRequest(`/user/${id}`);
        setUserData(user.result.data);
      }
    } catch (exception) {
      console.error(exception);
    }
  };

  const fetchFollowStatus = async () => {
    try {
      if (!isViewingOwnProfile && id) {
        const res = await userSvc.getRequest(`/user/${id}/follow-status`);
        setIsFollowing(res.result.data.isFollowing);
      }
    } catch (error) {
      console.error("Failed to fetch follow status");
    }
  };

  useEffect(() => {
    retrieveUserDetail();
    postsByUser();
    fetchFollowStatus();
  }, [id]);

  return (
    <Layout.Content>
      <main className="w-max-6xl mx-auto px-4 py-4 bg-white">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="bg-indigo-100 h-48">
            <img src={userData?.image?.optimizedUrl} alt="cover" />
          </div>
          <div className="flex justify-between items-end -mt-16 mb-4 mx-2">
            <div className="flex items-end">
              <div className="relative">
                <img
                  src={userData?.image?.optimizedUrl}
                  alt="profile"
                  className="h-32 w-32 rounded-full border-4 border-white"
                />
                <button
                  title="edit profile pic"
                  className="absolute bottom-2 right-2 bg-[#4f6f52] text-white p-2 rounded-full"
                >
                  <EditOutlined />
                </button>
              </div>
              <div className="ml-6 mb-4">
                <h1 className="text-xl font-bold text-[#4f6f52]">
                  {userData?.fullName || userData?.fullName}
                </h1>
                <p className="text-[#4f6f52]">@{userData?.username}</p>
              </div>
            </div>
            <div className="flex mb-4">
              {isViewingOwnProfile ? (
                <Button className="bg-[#4f6f52]! text-white! rounded-xl!">
                  <EditOutlined className="mr-1!" /> Edit Profile
                </Button>
              ) : (
                <Button
                  className="bg-[#4f6f52]! text-white! rounded-xl!"
                  onClick={async () => {
                    try {
                      await userSvc.postRequest(`/user/${id}/follow`, {});
                      setIsFollowing((prev) => !prev);
                      notifcation(
                        isFollowing
                          ? "You have unfollowed the user"
                          : "You have followed the user",
                        NotificationType.INFO
                      );
                    } catch (exception) {
                      notifcation("Follow action failed", NotificationType.ERROR);
                    }
                  }}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </Button>
              )}
            </div>
          </div>
          <p className="mb-4 mx-2">{userData?.bio}</p>
          <div className="flex flex-wrap mx-2 text-sm mb-1">
            <div className="flex items-center gap-x-1 mr-6">
              <EnvironmentOutlined />
              <span>{userData?.address}</span>
            </div>
            <div className="flex items-center gap-x-1 mr-6">
              <LinkOutlined />
              <a href="#">janedoe.com</a>
            </div>
            <div className="flex items-center gap-x-1 mr-6">
              <CalendarOutlined />
              <span>
                {userData?.createdAt
                  ? new Date(userData.createdAt).toLocaleDateString()
                  : ""}
              </span>
            </div>
          </div>
        </div>

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
                  {userData?.followers?.length}
                </p>
                <p className="text-gray-500 text-sm">Followers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#4f6f52]">
                  {userData?.following?.length}
                </p>
                <p className="text-gray-500 text-sm">Following</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold text-[#4f6f52] mb-2">Categories</h3>
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
                      )} min read
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
