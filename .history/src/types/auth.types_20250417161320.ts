export interface ICredentials {
    username: string;
    password: string;
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
  