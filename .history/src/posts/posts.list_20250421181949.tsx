import { LoadingOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Input, Layout, Table, Typography } from "antd";
import { useState } from "react";
import { PiUploadDuotone } from "react-icons/pi";
import { NavLink } from "react-router";


export interface IPostType{
    "_id": "67fe6774059f5d108ecfec9c",
    "title": "Travel Experience in Nepal: Where Adventure Meets Serenity",
    "slug": "travel-experience-in-nepal:-where-adventure-meets-serenity",
    "content": "Nepal, a land where snow-capped Himalayan peaks give way to steamy jungles, and ancient temples stand alongside bustling modern streets. This small yet incredibly diverse country offers something for every type of traveler—whether you're an adrenaline junkie, a culture enthusiast, or a spiritual seeker.\n\nFor adventure lovers, Nepal is nothing short of paradise. The Himalayas dominate the landscape, offering some of the world's most spectacular trekking routes. The legendary Everest Base Camp Trek takes you through Sherpa villages and high-altitude monasteries, culminating in breathtaking views of the world's highest peak. If you prefer fewer crowds, the Annapurna Circuit winds through terraced fields, lush rhododendron forests, and arid high mountain passes, showcasing Nepal's incredible geographical diversity. For a truly off-the-beaten-path experience, the Manaslu Circuit offers remote trails with stunning views of Mount Manaslu, Nepal’s eighth-highest peak. Beyond trekking, Nepal is a hotspot for adrenaline-pumping activities like white-water rafting in the Trishuli River, paragliding over Pokhara’s serene Phewa Lake, and even bungee jumping from one of the world’s highest suspension bridges in Bhote Koshi.\n\nCulture and history buffs will find themselves enchanted by Nepal’s rich heritage. The Kathmandu Valley alone boasts seven UNESCO World Heritage Sites, including the ancient city of Bhaktapur, where time seems to stand still amid intricately carved wooden temples and brick-paved streets. In Patan, you’ll discover exquisite Newari architecture and a thriving arts scene, while Kathmandu’s Durbar Square offers a fascinating glimpse into Nepal’s royal past. The sacred stupas of Swayambhunath (affectionately known as the Monkey Temple) and Boudhanath are spiritual hubs where the air is thick with the scent of incense and the murmur of Buddhist mantras. For a deeper dive into Nepal’s spiritual side, the pilgrimage town of Lumbini—the birthplace of Buddha—is a must-visit, with its peaceful gardens and monasteries representing Buddhist traditions from around the world.",
    "tags": [
        "travel",
        "adventure"
    ],
    "categoryId": {
        "image": {
            "url": "https://res.cloudinary.com/dkunajgg7/image/upload/v1744724763/blog-platform/Category/garskjmo5s37svrwq0pn.jpg",
            "optimizedUrl": "https://res.cloudinary.com/dkunajgg7/image/upload/f_auto,q_auto/v1/blog-platform/Category/garskjmo5s37svrwq0pn?_a=BAMCkGTG0"
        },
        "_id": "67fe631d299340a19531f7b4",
        "title": "Travel and Tourism",
        "slug": "travel-and-tourism",
        "status": "active"
    },
    "authorId": null,
    "status": "published",
    "views": 0,
    "likes": [],
    "commentsCount": 0,
    "publishedAt": "2025-04-15T14:04:32.336Z",
    "images": [
        {
            "url": "https://res.cloudinary.com/dkunajgg7/image/upload/v1744725873/blog-platform/Posts/tliotfm11ppwcqgzabyb.jpg",
            "optimizedUrl": "https://res.cloudinary.com/dkunajgg7/image/upload/f_auto,q_auto/v1/blog-platform/Posts/tliotfm11ppwcqgzabyb?_a=BAMCkGTG0",
            "_id": "67fe6774059f5d108ecfec9d"
        },
        {
            "url": "https://res.cloudinary.com/dkunajgg7/image/upload/v1744725874/blog-platform/Posts/ixa8qc5mndwjifeacocj.jpg",
            "optimizedUrl": "https://res.cloudinary.com/dkunajgg7/image/upload/f_auto,q_auto/v1/blog-platform/Posts/ixa8qc5mndwjifeacocj?_a=BAMCkGTG0",
            "_id": "67fe6774059f5d108ecfec9e"
        }
    ],

}

const PostList = () => {
  const [search, setSearch] = useState<string>();

    const tableColumns = [
        {
            title: "Title",
            dataIndex: "title",
        },
        {
            title:"Slug",
            dataIndex:"slug"
        },
        {
            title:"Category",
            dataIndex:""
        },
        {
            title:"Image",
            dataIndex:""
        },
        {
            title:"Content",
            dataIndex:""
        },
        {
            title:"Tags",
            dataIndex:""
        },
        {
            title:"Status",
            dataIndex:""
        },
        {
            title:"Action",

        }

    ];


    const [postData,setPostData] = useState<>()

  return (
    <>
      <Layout.Content className="bg-white rounded-md p-8 shadow-md">
        <div className="flex items-center justify-between border-b pb-4 mb-6">
          <Typography.Title
            level={2}
            className="!mb-0 !text-2xl font-semibold text-gray-800"
          >
            Posts Management
          </Typography.Title>
          <NavLink
            to="/admin/users/create"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded transition"
          >
            <PlusOutlined /> Add User
          </NavLink>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <Input.Search
            allowClear
            enterButton="Search"
            placeholder="Search user..."
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
        </div>

        <Table
          size="middle"
          columns={tableColumns}
          /* dataSource={data}
          rowKey={(record) => record._id}
          pagination={pagination}
          loading={{
            spinning: loading,
            indicator: <LoadingOutlined/>,
            tip: "Loading posts...",
            size: "default",
          }}
          onChange={handleTableChange}
          bordered */
        />
      </Layout.Content>
    </>
  );
};

export default PostList;
