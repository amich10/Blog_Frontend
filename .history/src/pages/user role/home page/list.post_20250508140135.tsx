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
  PlusOutlined,
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

const { Content } = Layout;
const { Search } = Input;

const IconText = ({
  icon,
  text,
}: {
  icon: React.FC;
  text: string;
}) => (
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
  likesCount:number;
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
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  const retrievePosts = async ({
    page = pagination.current,
    limit = pagination.pageSize,
    search = "",
  }: IQueryProps) => {
    try {
      setLoading(true);
      const response = await postSvc.getRequest("/post/all", {
        params: { page, limit, search },
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
    retrievePosts({
      page: pagination.current,
      limit: pagination.pageSize,
      search: search,
    });
  }, []);

  // Search debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      retrievePosts({
        page: 1,
        limit: pagination.pageSize,
        search: search,
      });
      setPagination((prev) => ({ ...prev, current: 1 }));
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

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
  const [randomIdea, setRandomIdea] = useState<string>("")
  useEffect(() =>{
    const randomIndex = Math.floor (Math.random() * ideas.length)
    setRandomIdea(ideas[randomIndex])
  },[])

  const {users} = useUsers()
  const {userDetails} = useAuth()

  const loggedInuserId = userDetails._id

  return (
   
  );
};

export default ListPosts;
