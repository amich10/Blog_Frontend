
import { Navigate } from "react-router";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { ReactNode } from "react";
import { useAuth } from "../../context/auth.context";

interface PrivateRouteProps {
  children: ReactNode;
}

const loadingSpinner = (
  <Spin fullscreen tip="Checking login..." indicator={<LoadingOutlined />} />
);

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { userDetails } = useAuth()

  // If userDetails is still undefined, that means we're checking if the user is logged in
  if (userDetails === undefined) {
    return loadingSpinner;
  }

  // If user is NOT logged in
  if (!userDetails || !userDetails._id) {
    return <Navigate to="/" />;
  }

  // If user IS logged in
  return <>{children}</>;
};

export default PrivateRoute;
