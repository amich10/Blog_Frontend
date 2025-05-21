import {
  ArrowUpOutlined,
  CommentOutlined,
  EditOutlined,
  EyeOutlined,
  FileImageOutlined,
  LoadingOutlined,
  MoreOutlined,
  PlusOutlined,
  TagsOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Layout,
  List,
  Spin,
  Statistic,
  Typography,
} from "antd";
import { useUsers } from "../../context/user.context";
import { useCategory } from "../../context/category.context";
import { useNavigate } from "react-router";
import { usePost } from "../../context/post.context";
import { useState } from "react";
const { Title, Text } = Typography;

const AdminDashBoard = () => {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)
  const { users } = useUsers();
  const { data } = useCategory();
  const {posts,setPosts} = usePost()

  return (
    <>{loading : <Spin tip="Loading ..."  fullscreen indicator={<LoadingOutlined/>}/> ? 
  }
    </>
  );
};

export default AdminDashBoard;
