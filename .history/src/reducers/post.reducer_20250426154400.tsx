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



let initialState = {
   postsList:null
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
            let payload = action.payload.result.data
            state.postsList = payload
        })
        builder.addCase(getAllPosts.rejected,(state))
    },
})

export default postSlice.reducer