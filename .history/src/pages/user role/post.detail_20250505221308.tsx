import { useParams } from "react-router";
import { useEffect, useState } from "react";
import postSvc from "../../services/post.service";
import notifcation, { NotificationType } from "../../utilities/helpers";
import { Avatar, Button, Layout, Spin } from "antd";
import {
  EyeOutlined,
  LikeFilled,
  LikeOutlined,
  LoadingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import commentSVc from "../../services/comment.service";
import { useForm } from "react-hook-form";
import { TextAreaController } from "../../components/input.component";
type BlogPost = {
  authorId: string;
  categoryId: string;
  commentsCount: number;
  content: string;
  createdAt: string;
  excerpt: string;
  images: Array<any>;
  likes: Array<any>;
  publishedAt: string | null;
  slug: string;
  status: string;
  tags: Array<any>;
  title: string;
  updatedAt: string;
  updatedBy: string | null;
  views: number;
  _id: string;
};

const PostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isFollowing, setIsFollowing] = useState<boolean>();
  const [comments, setComments] = useState<Array<{ postId: string; userId: { image?: { optimizedUrl: string }; username?: string }; createdAt?: string; content: string }>>([]);

  const fetchPost = async () => {
    try {
      const response = await postSvc.getRequest(`/post/${slug}`);
      setPost(response.result.data);
      console.log(response.result.data);
    } catch (exception: any) {
      notifcation("Sorry post cannot be fetched now.", NotificationType.ERROR);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await commentSVc.getRequest("/comment/post/" + slug);
      setComments(response.result.data.content);
      console.log(response.result.data.['cone']);
    } catch (exception) {
      console.log(exception);
    }
  };

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      content: "",
    },
  });

  const createComment = async (data: any) => {
    try {
      console.log(data);
      await commentSVc.postRequest("/comment/create", data);
      notifcation("Comment posted successfully!", NotificationType.SUCCESS);
      reset();
      fetchComments();
    } catch (exception) {
      notifcation("Failed to post comment.", NotificationType.ERROR);
    }
  };

  useEffect(() => {
    if (slug) {
      setComments([]);
      fetchPost();
      fetchComments();
    }
  }, [slug]);

  if (!post)
    return (
      <Spin tip="Loading..." fullscreen indicator={<LoadingOutlined />}></Spin>
    );

  return (
    <Layout.Content className="bg-white">
      <div className="min-h-screen flex">
        {/* Left Side */}
        <div className="w-3/4 h-full border-r border-gray-200 px-8 py-2">
          <div className="p-6 rounded-lg">
            <h1 className="font-bold text-4xl mb-6 [#4f6f52]">{post.title}</h1>
            <div className="flex items-center gap-4 mb-6">
              <Avatar size="large" icon={<UserOutlined />} />
              <div className="flex flex-col">
                <span className="font-semibold text-md">
                  Author: {post.authorId}
                </span>
                <span className="text-gray-500 text-sm">
                  Published on {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
              <Button
                type="primary"
                shape="round"
                className="ml-auto! bg-[#4f6f52]! "
                onClick={() => {
                  setIsFollowing(!isFollowing);
                  notifcation(
                    isFollowing
                      ? "You have unfollowed the author."
                      : "You are now following the author.",
                    NotificationType.INFO
                  );
                }}
              >
                {isFollowing ? "following" : "follow"}
              </Button>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-white font-bold bg-[#4f6f52] py-1 px-3 rounded-lg">
                {post.categoryId}
              </span>
              <Button
                type="text"
                icon={
                  post.likes.length > 0 ? (
                    <LikeFilled className="text-[#4f6f52]!" />
                  ) : (
                    <LikeOutlined />
                  )
                }
                className="text-gray-600 text-sm flex items-center gap-1"
                onClick={() => {
                  if (post.likes.length > 0) {
                    setPost({ ...post, likes: post.likes.filter(() => false) });
                  } else {
                    setPost({ ...post, likes: [...post.likes, {}] });
                  }
                }}
              >
                {post.likes.length}
              </Button>
              <span className=" text-sm flex items-center gap-2">
                <EyeOutlined className="text-[#4f6f52]" />
                {post.views}
              </span>
            </div>
            <div className="mb-6">
              {post.images.length > 0 && (
                <img
                  src={post.images[0]?.optimizedUrl}
                  alt={post.title}
                  className="w-full h-auto max-h-96 object-cover rounded-md shadow-md"
                />
              )}
            </div>
            <div className="text-gray-800 leading-relaxed">
              <p>{post.content}</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-1/4 h-full px-3 py-4 sticky top-0">
          <div className="border-1 border-gray-100 p-2 rounded-md">
            <h2 className="font-semibold text-white mb-2 rounded-md bg-[#4f6f52] py-1 px-3  text-center">
              Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-white border border-[#4f6f52] text-sm px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4 border border-gray-100 p-2">
            <h2 className="bg-[#4f6f52] px-3 py-1 text-center font-bold text-white">
              All Comments ({post.commentsCount})
            </h2>
            <div className="mt-2 space-y-3">
              {comments && comments.length > 0 ? (
              comments
                .filter((comment) => comment.postId === post._id)
                .sort((a, b) => 
                new Date(b.createdAt || "").getTime() - 
                new Date(a.createdAt || "").getTime()
                )
                .map((comment, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-md p-2"
                >
                  <div className="flex items-center gap-2 mb-1">
                  <Avatar
                    size="small"
                    src={comment.userId?.image?.optimizedUrl}
                  />
                  <span className="font-extralight text-xs">
                    {comment.userId?.username || "Anonymous"}
                  </span>
                  <span className="text-xs text-gray-400 ml-auto">
                    {comment.createdAt
                    ? new Date(comment.createdAt).toLocaleString()
                    : ""}
                  </span>
                  </div>
                  <div className="text-gray-800 text-sm">
                  {comment.content}
                  </div>
                </div>
                ))
              ) : (
              <div className="text-gray-400 text-center py-4">
                No comments yet.
              </div>
              )}
            </div>
            <div className="mt-4">
              <form
                onSubmit={handleSubmit((data) =>
                  createComment({ ...data, postId: post._id })
                )}
              >
                <h3 className="font-semibold mb-2">Post a Comment</h3>
                <TextAreaController
                  classes="w-full border border-gray-300 rounded-md p-2 mb-2"
                  autoSize={{ minRows: 3 }}
                  control={control}
                  placeholder="Write your comment..."
                  name="content"
                />
                <Button
                  htmlType="submit"
                  type="primary"
                  className="bg-[#4f6f52]! flex! justify-center! items-center! mt-3!"
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout.Content>
  );
};

export default PostDetail;
