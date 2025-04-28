import { createSlice } from "@reduxjs/toolkit";



interface IPost {
    id: string;
    title: string;
    content: string;
    author: string;
    createdAt: string;
    updatedAt?: string;
}
let initalState:Ipo = {

}

const postSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{
        
    }
})

export default postSlice.reducer