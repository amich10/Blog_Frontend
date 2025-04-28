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
            const reponse = await postSvc.getRequest("/post/all")
            return reponse.result.data;
        } catch (exception) {

            throw exception
        }
    }
)

const postSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{
        
    },
    extraReducers:(builder) => {
        builder.addCase(getAllPosts.fulfilled,(state,action) =>{
            let payload = action.payload
        })
    },
})

export default postSlice.reducer