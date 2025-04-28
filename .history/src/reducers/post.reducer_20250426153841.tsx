import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



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
            const reponse:IPost = 
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