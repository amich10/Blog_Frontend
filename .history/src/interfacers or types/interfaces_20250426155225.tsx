

export interface IQueryType {
    page?:number,
    limit?:number,
    search?:string | null
}


export interface ICategoryTyoe {
    _id: string;
    title: string;
    slug: string;
    parentId: string | null;
    status: string;
    image: {
        url: string;
        optimizedUrl: string;
    };
    createdBy: {
        _id: string;
        username: string;
        email: string;
        role: string;
        status: string;
    };
    updatedBy: any;
    createdAt: string;
    updatedAt: string;
}


export interface IPostsType {
    _id: string;
    title: string;
    slug: string;
    content: string;
    tags: string[];
    authorId: string | null;
    status: string;
    views: number;
    likes: any[];
    commentsCount: number;
    images: {
        url: string;
        optimizedUrl: string;
    };
    categoryId: {
        image: {
            url: string;
            optimizedUrl: string;
        };
        _id: string;
        title: string;
        slug: string;
        status: string;
    };
}


export interface IUserType {
    _id: string;
    fullName: string;
    username: string;
    email: string;
    password: string;
    role: string;
    phone: string;
    address: string;
    bio: string;
    status: string;
    activationToken: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    gender: string;
}