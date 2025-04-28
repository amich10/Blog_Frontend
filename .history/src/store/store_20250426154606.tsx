
import {configureStore} from  "@"
import { postReducer } from "../reducers/post.reducer"
const store = configureStore({
    reducer:{
        postReducer
    }
})

export default configureStore
