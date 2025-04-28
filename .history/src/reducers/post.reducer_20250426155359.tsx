import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postSvc from "../services/post.service";






let initialState = {
   postsList:I
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
        builder.addCase(getAllPosts.rejected,(state,action) =>{
            state.postsList = null
        })
    },
})


export const { reducer: postReducer } = postSlice;
export default postSlice.reducer;