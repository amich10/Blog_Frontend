import { useParams } from "react-router"
import postSvc from "../services/post.service"
import notifcation from "../utilities/helpers"
import { useState } from "react"






_id
67fe6774059f5d108ecfec9c
title
"Travel Experience in Nepal: Where Adventure Meets Serenity"
slug
"travel-experience-in-nepal:-where-adventure-meets-serenity"
content
"Nepal, a land where snow-capped Himalayan peaks give way to steamy jun…"

tags
Array (2)
categoryId
67fe631d299340a19531f7b4
authorId
67fe273591b701abe0cd75d1
status
"published"
views
0

likes
Array (empty)
commentsCount
0
publishedAt
2025-04-15T14:04:32.336+00:00

images
Array (2)
updatedBy
null
excerpt
"Nepal, a land where snow-capped Himalayan peaks give way to steamy jun…"
createdAt
2025-04-15T14:04:36.557+00:00
updatedAt
2025-04-15T14:04:36.557+00:00
__v
0

const EditPost = () =>{



    const params = useParams()
    const[postDetail,setPostDetail] = useState<>()

    const getPostById = async() =>{
        try {
            const postDetail = await postSvc.getRequest('/post'+params.id)
            
        } catch (exception) {
            throw exception
        }
    }


return (
    <>
 
    </>
)
}
export default EditPost