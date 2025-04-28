

export interface IQuery {
    page?:number,
    limit?:number,
    search?:string | null
}


export interface ICategory {
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


export interface IPOS