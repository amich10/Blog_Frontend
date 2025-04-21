import { createContext, ReactNode, SetStateAction, useContext, useEffect, useState, Dispatch } from "react";
import authSvc from "../services/auth.service";
import notifcation, { getLocalStorage, NotificationType, setLocalStorage } from "../utilities/helpers";
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
  const [userDetails, setUserDetails] = useState<IUserDetails | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const getLoggedInUser = async () => {
    try {
      setLoading(true); // Set loading to true before making the request
      const userInfo = await authSvc.getRequest("auth/me");
      console.log("Logged in user data :", userInfo);
      if (userInfo?.result?.data) {
        setUserDetails(userInfo.result.data); // Safely set user details
      } else {
        throw new Error("Failed to retrieve user data");
      }
    } catch (exception) {
      console.log("Error fetching user data:", exception);
      notifcation("Unable to retrieve user data. Please try again.", NotificationType.ERROR);
    } finally {
      setLoading(false); // Ensure loading is turned off in both success and failure cases
    }
  };

  const LoginFunc = async (credentials: ICredentials) => {
    try {
      setLoading(true); // Set loading to true before making the request
      const response = await authSvc.postRequest("/auth/login", credentials);
      console.log("Response :", response);
      if (response?.result?.message) {
        notifcation(response.result.message, NotificationType.SUCCESS);
        setLocalStorage(webStorageConstants.ACCESS, response.result.data.accessToken);
        setLocalStorage(webStorageConstants.REFRESH, response.result.data.refreshToken);
        await getLoggedInUser();
      }
    } catch (exception: any) {
      console.log("Login failed:", exception);
      notifcation("Sorry, you cannot login at this moment. Please, try again later.", NotificationType.ERROR);
    } finally {
      setLoading(false); // Ensure loading is turned off after the request
    }
  };

  const forgetPasswordFunc = async (data: { email: string }) => {
    try {
      setLoading(true); // Set loading to true before making the request
      const response = await authSvc.postRequest("auth/forget-password", data);
      notifcation(response.result.message, NotificationType.SUCCESS);
    } catch (exception: any) {
      console.log("Error during password reset:", exception);
      const errorMsg = exception.response?.message || "Unexpected error occurred. Please try again after some time.";
      notifcation(errorMsg, NotificationType.ERROR);
    } finally {
      setLoading(false); // Ensure loading is turned off after the request
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
      {loading ? <Spin fullscreen /> : children}
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
