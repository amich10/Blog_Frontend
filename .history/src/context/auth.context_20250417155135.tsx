import { createContext, ReactNode, SetStateAction, useContext, useEffect, useState, Dispatch } from "react";
import authSvc from "../services/auth.service";
import notifcation, { getLocalStorage, NotificationType, setLocalStorage } from "../utilities/helpers";
import { webStorageConstants } from "../constants/constants";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

export interface ICredentials {
  username: string;
  password: string;
}

export interface IChildrenProps {
  children: ReactNode;
}

export interface IUserDetails {
  name: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  status: string;
  _id: string;
  image: {
    url: string;
    optimizedUrl: string;
  };
  createdAt: Date;
  bio: string;
}

export interface IAuthContext {
    login: (credentials: ICredentials) => Promise<void>;
    forgetPassword: (data: { email: string }) => Promise<void>;
    userDetails: IUserDetails;
    setUserDetails: Dispatch<SetStateAction<IUserDetails | undefined>>;
  }

  export const AuthContext = createContext<IAuthContext>({
    login: async (_credentials: ICredentials): Promise<void> => {}, 
    forgetPassword: async (_data: { email: string }): Promise<void> => {}, 
    userDetails: {} as IUserDetails, 
    setUserDetails: () => {}, 
  });

export const AuthProvider = ({ children }: IChildrenProps) => {
  const [userDetails, setUserDetails] = useState<IUserDetails>();
  const [loading,setLoading] = useState<boolean>(false)

  const getLoggedInUser = async () => {
    try {
      const userInfo = await authSvc.getRequest("auth/me");
      console.log("Logged in user data :", userInfo);
      setUserDetails(userInfo.result.data);
      return userInfo.result.data;
    } catch (exception) {
      throw exception
    }
  };

  const LoginFunc = async (credentials: ICredentials) => {
    setLoading(true)
    try {
      const response = await authSvc.postRequest("/auth/login", credentials);
      console.log("Response :", response);
      notifcation(response.result.message, NotificationType.SUCCESS);
      setLocalStorage(webStorageConstants.ACCESS, response.result.data.accessToken);
      setLocalStorage(webStorageConstants.REFRESH, response.result.data.refreshToken);
      return await getLoggedInUser();
    } catch (exception: any) {
      notifcation(exception.response.message, NotificationType.ERROR);
    } finally{
    setLoading(false)
    }
  };

  const forgetPasswordFunc = async (data: { email: string }) => {
    try {
      const response = await authSvc.postRequest("auth/forget-password", data);
      notifcation(response.result.message, NotificationType.SUCCESS);
    } catch (exception: any) {
      const errorMsg = exception.response.message || "Unexpected error occurred. Please try again after some time.";
      notifcation(errorMsg, NotificationType.ERROR);
    }
  };

  useEffect(() => {
    let token = getLocalStorage(webStorageConstants.ACCESS);
    if (token) {
      getLoggedInUser();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login: LoginFunc,
        forgetPassword: forgetPasswordFunc,
        userDetails: userDetails as IUserDetails, 
        setUserDetails: setUserDetails, 
      }}
    >
      {loading ?  <Spin fullscreen tip="ol... " indicator={<LoadingOutlined/>}/> :children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const { login, forgetPassword, userDetails, setUserDetails } = useContext(AuthContext);
  return {
    login,
    forgetPassword,
    userDetails,
    setUserDetails,
  };
};

