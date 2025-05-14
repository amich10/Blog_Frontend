import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Layout,
  List,
  Avatar,
  Space,
  Card,
  TablePaginationConfig,
  Input,
  Pagination,
} from "antd";
import {
  FormOutlined,
  LeftOutlined,
  LikeOutlined,
  MessageOutlined,
  RightOutlined,
} from "@ant-design/icons";
import postSvc from "../../../services/post.service";
import {
  IQueryProps,
  useCategory,
} from "../../../context/category context/category.context";
import { useNavigate } from "react-router";
import { useUsers } from "../../../context/user.context";
import { useAuth } from "../../../context/auth.context";
import userSvc from "../../../services/user.service";
import notifcation, { NotificationType } from "../../../utilities/helpers";

const { Content } = Layout;
const { Search } = Input;

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export interface IBlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  tags: string[];
  categoryId: {
    image: { url: string; optimizedUrl: string };
    _id: string;
    title: string;
    slug: string;
    status: "active" | "inactive";
  };
  authorId: {
    _id: string;
    username: string;
    email: string;
    role: "admin" | "user";
    status: "active" | "inactive";
  };
  status: "published" | "draft" | "inactive";
  views: number;
  likes: string[];
  commentsCount: number;
  likesCount: number;
  publishedAt: string;
  images: { url: string; optimizedUrl: string; _id: string }[];
  updatedBy: string;
  excerpt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const ListPosts: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scroll = (offset: number) => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += offset;
    }
  };

  const [posts, setPosts] = useState<IBlogPost[]>([]);
  const { data } = useCategory();
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set());

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  const retrievePosts = async ({
    page = pagination.current,
    limit = pagination.pageSize,
    search = "",
    categoryId = null,
  }: IQueryProps & { categoryId: string | null }) => {
    try {
      setLoading(true);
      const response = await postSvc.getRequest("/post/all", {
        params: { page, limit, search, categoryId },
      });

      setPosts(response.result.data);
      setPagination((prev) => ({
        ...prev,
        pageSize: limit,
        current: page,
        total: response.result.options.total,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    if (!selectedCategoryId && search === "") {
      retrievePosts({
        page: pagination.current,
        limit: pagination.pageSize,
        search: search,
        categoryId: null,
      });
    }
  }, []);

  // Search debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      retrievePosts({
        page: 1,
        limit: pagination.pageSize,
        search: search,
        categoryId: selectedCategoryId,
      });
      setPagination((prev) => ({ ...prev, current: 1 }));
    }, 500);
    return () => clearTimeout(timer);
  }, [search, selectedCategoryId]);

  const handlePageChange = (page: number, pageSize?: number) => {
    const finalPageSize = pageSize || pagination.pageSize!;
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: finalPageSize,
    }));
    retrievePosts({
      page,
      limit: finalPageSize,
      search,
      categoryId: selectedCategoryId,
    });
  };

  const ideas = [
    "Share your ideas and experience to the world",
    "Your creativity is key to unlock your imagination",
    "Inspire others with your unique perspective",
    "Express your thoughts and make an impact",
    "Turn your passion into powerful stories",
    "Write about the moments that changed your life",
    "Explore the beauty of storytelling through words",
    "Connect with readers by sharing your journey",
    "Unleash your potential by writing your heart out",
    "Transform your thoughts into meaningful content",
  ];
  const [randomIdea, setRandomIdea] = useState<string>("");
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * ideas.length);
    setRandomIdea(ideas[randomIndex]);
  }, []);

  const { users } = useUsers();
  const { userDetails } = useAuth();

  const loggedInuserId = userDetails._id;

  return (
    <Content className="shadow-xl rounded-md bg-white relative">
      <div className="flex h-full">
        {/* Left Panel */}
        <div className="w-3/4 border-r border-gray-200 h-full px-6">
          {/* Category Scrollbar */}
          <div className="flex items-center gap-3 p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
            <Button
              icon={<LeftOutlined />}
              className="!text-[#4f6f52] !border-none"
              onClick={() => scroll(-150)}
            />
            <div
              ref={sliderRef}
              className="flex gap-3 overflow-x-auto scroll-smooth scrollbar-hide flex-1 px-2"
            >
              {[{ _id: "all", title: "All Posts" }, ...data].map((category) => (
                <div
                  key={category._id}
                  onClick={() => {
                    const catId = category._id === "all" ? null : category._id;
                    setSelectedCategoryId(catId);
                    retrievePosts({
                      page: 1,
                      limit: pagination.pageSize,
                      search,
                      categoryId: catId,
                    });
                    setPagination((prev) => ({ ...prev, current: 1 }));
                  }}
                  className={`flex-shrink-0 px-4 py-1 rounded-full cursor-pointer transition duration-300 whitespace-nowrap text-sm ${
                    selectedCategoryId ===
                    (category._id === "all" ? null : category._id)
                      ? "bg-[#4f6f52] text-white"
                      : "bg-gray-100 hover:bg-[#4f6f52] hover:text-white"
                  }`}
                >
                  {category.title}
                </div>
              ))}
            </div>
            <Button
              icon={<RightOutlined />}
              className="!text-[#4f6f52] !border-none"
              onClick={() => scroll(150)}
            />
          </div>

          {/* Search Bar */}
          <div className="my-4 mx-6">
            <Search
              placeholder="Search blog posts..."
              allowClear
              style={{ width: "100%" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onSearch={(val) => setSearch(val)}
            />
          </div>

          {/* Blog List */}
          <List
            className="py-6"
            loading={loading}
            itemLayout="vertical"
            size="large"
            dataSource={posts}
            renderItem={(item) => (
              <List.Item
                key={item._id}
                className="border border-gray-100 rounded-2xl gap-2 mb-4"
                actions={[
                  <Button
                    className="text-[#4f6f52]!"
                    type="link"
                    icon={
                      <IconText
                        icon={LikeOutlined}
                        text={item.likesCount.toString()}
                      />
                    }
                    onClick={() => navigate(`/blogs/${item.slug}`)}
                  />,
                  <Button
                    type="link"
                    className="text-[#4f6f52]! hover:bg-green-900"
                    icon={
                      <IconText
                        icon={MessageOutlined}
                        text={item.likesCount.toString()}
                      />
                    }
                    onClick={() => navigate(`/blogs/${item.slug}`)}
                  />,
                ]}
                extra={
                  <img
                    width={272}
                    alt="cover"
                    src={item.images[0]?.optimizedUrl}
                    className="rounded-md h-30 w-50"
                  />
                }
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={
                        users.find((user) => user._id === item.authorId._id)
                          ?.image?.optimizedUrl
                      }
                    />
                  }
                  title={
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">
                        {users.find((user) => user._id === item.authorId._id)
                          ?.fullName || "Unknown"}
                      </span>
                      <a
                        onClick={() => navigate(`/blogs/${item.slug}`)}
                        className="text-[#4f6f52] cursor-pointer"
                      >
                        <span className="text-[#4f6f52] font-serif font-semibold">
                          {" "}
                          {item.title}
                        </span>
                      </a>
                    </div>
                  }
                  description={
                    <div>
                      {item.excerpt}....{" "}
                      <Button
                        type="link"
                        className="text-[#4f6f52]! font-semibold! font-serif! text-xs! underline!"
                        onClick={() => navigate(`/blogs/${item.slug}`)}
                      >
                        Load More
                      </Button>
                    </div>
                  }
                />
              </List.Item>
            )}
          />

          {/* Pagination */}
          <div className="text-center my-4">
            <Pagination
              current={pagination.current}
              pageSize={pagination.pageSize}
              total={pagination.total}
              onChange={handlePageChange}
            />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-1/4 h-full p-4 space-y-8 sticky top-0">
          <Button
            type="primary"
            className="!bg-[#4f6f52] hover:!bg-[#3d5842] w-full h-20! flex justify-center items-center mb-3! shadow-lg! border-b-2! border-gray-300!"
            onClick={() => navigate("/blogs/create")}
          >
            <div className="flex flex-col gap-1">
              <span className="text-white! font-semibold text-lg">
                {" "}
                <FormOutlined /> Write your own Blog
              </span>
              <span className="italic">"{randomIdea}"</span>
            </div>
          </Button>

          {/* Featured Posts */}
          <Card
            className="mt-2"
            title={
              <span className="text-[#4f6f52] font-semibold font-serif text-xl">
                Featured Posts
              </span>
            }
          >
            <List
              itemLayout="horizontal"
              dataSource={[...posts]
                .sort((a, b) => b.views - a.views)
                .slice(0, 3)}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <span
                        onClick={() => navigate(`/blogs/${item.slug}`)}
                        className="text-[#4f6f52] font-semibold font-serif hover:cursor-pointer"
                      >
                        {item.title}
                      </span>
                    }
                    description={
                      <span className="text-[14px]">
                        {item.excerpt.length > 100
                          ? `${item.excerpt.slice(0, 80)}...`
                          : item.excerpt}
                        <Button
                          type="link"
                          className="text-[#4f6f52]! font-semibold! font-serif! text-xs! underline!"
                          onClick={() => navigate(`/blogs/${item.slug}`)}
                        >
                          Load More
                        </Button>
                      </span>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>

          {/* Who to Follow */}
          <Card
            title={
              <span className="text-[#4f6f52] font-serif font-bold">
                Who to Follow
              </span>
            }
            bordered={true}
            className="rounded-md mt-3!"
          >
            <List
              itemLayout="horizontal"
              dataSource={
                users
                  .filter((user) => user._id !== loggedInuserId)
                  .sort(() => 0.5 - Math.random())
                  .slice(0, 5) || []
              }
              renderItem={(user) => (
                <List.Item
                  actions={[
                    <Button
                      type="primary"
                      size="small"
                      className="!bg-[#4f6f52] hover:!bg-[#3d5842]"
                      key="follow"
                      onClick={async () => {
                        try {
                          await userSvc.postRequest(
                            `/user/${user._id}/follow`,
                            {}
                          );
                          setFollowedUsers((prev) => {
                            const updated = new Set(prev);
                            if (updated.has(user._id)) {
                              updated.delete(user._id); // unfollow
                              notifcation(
                                "You have unfollowed the user",
                                NotificationType.INFO
                              );
                            } else {
                              updated.add(user._id); // follow
                              notifcation(
                                "You have followed the user",
                                NotificationType.INFO
                              );
                            }
                            return updated;
                          });
                        } catch (exception) {
                          notifcation(
                            "Follow action failed",
                            NotificationType.ERROR
                          );
                        }
                      }}
                    >
                      {followedUsers.has(user._id) ? "Unfollow" : "Follow"}
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={user?.image?.optimizedUrl} />}
                    title={
                      <span className="text-[#4f6f52]">{user?.username}</span>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </div>
    </Content>
  );
};

export default ListPosts;
