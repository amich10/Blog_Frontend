import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
    Dispatch,
    SetStateAction,
  } from "react";
  import authSvc from "../services/auth.service";
  import notifcation, {
    getLocalStorage,
    NotificationType,
    setLocalStorage,
  } from "../utilities/helpers";
  import { webStorageConstants } from "../constants/constants";
  
  // ---------- Interfaces ----------
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
  
  // ---------- Context Type ----------
  interface IAuthContext {
    login: (credentials: ICredentials) => Promise<void>;
    forgetPassword: (data: { email: string }) => Promise<void>;
    logout: () => void;
    userDetails: IUserDetails | undefined;
    setUserDetails: Dispatch<SetStateAction<IUserDetails | undefined>>;
  }
  
  // ---------- Context ----------
  export const AuthContext = createContext<IAuthContext>({
    login: async () => {},
    forgetPassword: async () => {},
    logout: () => {},
    userDetails: undefined,
    setUserDetails: () => {},
  });
  
  // ---------- Provider ----------
  export const AuthProvider = ({ children }: IChildrenProps) => {
    const [userDetails, setUserDetails] = useState<IUserDetails>();
  
    const getLoggedInUser = async () => {
      try {
        const userInfo = await authSvc.getRequest("auth/me");
        console.log("Logged in user data:", userInfo);
        setUserDetails(userInfo.result.data);
        return userInfo.result.data;
      } catch (exception) {
        console.error("Failed to get user info", exception);
      }
    };
  
    const login = async (credentials: ICredentials) => {
      try {
        const response = await authSvc.postRequest("/auth/login", credentials);
        console.log("Login response:", response);
        notifcation(response.result.message, NotificationType.SUCCESS);
        setLocalStorage(webStorageConstants.ACCESS, response.result.data.accessToken);
        setLocalStorage(webStorageConstants.REFRESH, response.result.data.refreshToken);
        await getLoggedInUser();
      } catch (exception: any) {
        notifcation(exception.response.message, NotificationType.ERROR);
      }
    };
  
    const forgetPassword = async (data: { email: string }) => {
      try {
        const response = await authSvc.postRequest("auth/forget-password", data);
        notifcation(response.result.message, NotificationType.SUCCESS);
      } catch (exception: any) {
        const errorMsg =
          exception.response.message ||
          "Unexpected error occurred. Please try again later.";
        notifcation(errorMsg, NotificationType.ERROR);
      }
    };
  
    const logout = () => {
      localStorage.removeItem(webStorageConstants.ACCESS);
      localStorage.removeItem(webStorageConstants.REFRESH);
      setUserDetails(undefined);
      notifcation("You have been logged out", NotificationType.SUCCESS);
    };
  
    useEffect(() => {
      const token = getLocalStorage(webStorageConstants.ACCESS);
      if (token) {
        getLoggedInUser();
      }
    }, []);
  
    return (
      <AuthContext.Provider
        value={{
          login,
          forgetPassword,
          logout,
          userDetails,
          setUserDetails,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  
  // ---------- Custom Hook ----------
  export const useAuth = () => useContext(AuthContext);
  