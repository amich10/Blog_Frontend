import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postSvc from "../services/post.service";



interface IPost {
    id: string;
    title: string;
    content: string;
    author: string;
    createdAt: string;
    updatedAt?: string;
}



let initialState: IPost = {
    id: "",
    title: "",
    content: "",
    author: "",
    createdAt: "",
    updatedAt: undefined,
};


export const getAllPosts = createAsyncThunk(
    "posts/getAllPosts",
    async() =>{
        try {
            
        } catch (exception) {
            const reponse:IPost = await postSvc.getRequest("/post/all")
            return 
        }
    }
)

const postSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{
        
    }
})

export default postSlice.reducer