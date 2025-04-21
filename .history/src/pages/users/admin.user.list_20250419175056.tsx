import { useState } from "react";

export interface IUserType {
    "image": {
            "url": "https://res.cloudinary.com/dkunajgg7/image/upload/v1744709427/blog-platform/users/cirzpvqgkonwhbs9t5qe.jpg",
            "optimizedUrl": "https://res.cloudinary.com/dkunajgg7/image/upload/f_auto,q_auto/v1/blog-platform/users/cirzpvqgkonwhbs9t5qe?_a=BAMCkGTG0"
        },
        "_id": "67fe273591b701abe0cd75d1",
        "fullName": "Mohammed Salah",
        "username": "Salah11",
        "email": "websiteblog70+salah11@gmail.com",
        "password": "$2b$12$mJkbP9nVOZIboyvLMCoYnOoq4BU1z8VAnO9r8HJjjAsDayg8bLIJy",
        "role": "admin",
        "phone": "9887654321",
        "address": "Hungary",
        "bio": "Hello, I am the user of this platform. I am going to create blogs.",
        "status": "active",
        "activationToken": "t2f7jLTCxOcerCDVT4IEHIo5tQEqvv0fjhbH2Djous9CgPxH4orQpUwsJ376hnW4JCtFnJLr8yyHG9spvd5mbXvU0LxzIcC1T22m",
        "createdAt": "2025-04-15T09:30:29.269Z",
        "updatedAt": "2025-04-19T12:03:00.744Z",
        "__v": 0,
        "gender": "male"
    },
}

const UserList = () =>{
    const [data,setData] = useState<>()

    return (
        <>
        
        </>
    )
}

export default UserList;