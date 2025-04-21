import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import authSvc from "../services/auth.service";
import notifcation, {
  getLocalStorage,
  NotificationType,
  setLocalStorage,
} from "../utilities/helpers";
import { webStorageConstants } from "../constants/constants";
import { Spin } from "antd";

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
export const AuthContext = createContext({
  login: async (_credentials: ICredentials): Promise<void> => {},
  forgetPassword: async (_data: { email: string }): Promise<void> => {},
  userDetails: {} as IUserDetails, //from useState
  setLoggedInUser: (_data: IUserDetails) => {},
});

export const AuthProvider = ({ children }: IChildrenProps) => {
  const [userDetails, setUserDetails] = useState<IUserDetails>();
  const [loading, setLoading] = useState<boolean>(true);

  const getLoggedInUser = async () => {
    setLoading(true);
    try {
      const userInfo = await authSvc.getRequest("auth/me");
      console.log("Logged in user data :", userInfo);
      setUserDetails(userInfo.result.data);
      return userInfo.result.data;
    } catch (exception) {
      throw exception;
    } finally {
      setLoading(false);
    }
  };

  const LoginFunc = async (credentials: ICredentials) => {
    try {
      // console.log(credentials)
      const response = await authSvc.postRequest("/auth/login", credentials);
      console.log("Response :", response);
      notifcation(response.result.message, NotificationType.SUCCESS);
      //set localStorage (access token)
      setLocalStorage(
        webStorageConstants.ACCESS,
        response.result.data.accessToken
      );
      setLocalStorage(
        webStorageConstants.REFRESH,
        response.result.data.refreshToken
      );
      return await getLoggedInUser();
    } catch (exception: any) {
      //console.log("Exception :",exception)
      notifcation(exception.response.message, NotificationType.ERROR);
    }
  };

  const forgetPasswordFunc = async (data: { email: string }) => {
    try {
      const response = await authSvc.postRequest("auth/forget-password", data);
      //console.log("Response",response)
      notifcation(response.result.message, NotificationType.SUCCESS);
    } catch (exception: any) {
      //console.log("Exception",exception)
      const errorMsg =
        exception.response.message ||
        "Unexpected error occured. Please, try again after some time.";
      notifcation(errorMsg, NotificationType.ERROR);
    }
  };

  // hydrating the state
  useEffect(() => {
    let token = getLocalStorage(webStorageConstants.ACCESS);
    if (!token) {
      g[]);

  return (
    <>
      <AuthContext.Provider
        value={{
          login: LoginFunc,
          forgetPassword: forgetPasswordFunc,
          userDetails: userDetails as IUserDetails,
          setLoggedInUser: (_data: IUserDetails) => {},
        }}
      >
        {loading ? <Spin fullscreen></Spin> : children}
      </AuthContext.Provider>
    </>
  );
};

//custom Hook
export const useAuth = () => {
  const { login, forgetPassword, userDetails, setLoggedInUser } =
    useContext(AuthContext);
  return {
    login,
    forgetPassword,
    userDetails,
    setLoggedInUser,
  };
};

/* to use this value in Components;
const {login} = useAuth() */
