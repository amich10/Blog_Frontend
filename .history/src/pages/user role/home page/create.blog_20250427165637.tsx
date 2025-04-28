import { Layout } from "antd";


const CreateBlog = () =>{
  return (
    <>
    <Layout.Content className="rounded-md h-full p-6 flex justify-center items-center bg-white">
      <div className="bg-white border p-3 w-150 rounded-md">
        Create a new blog post
      </div>
    </Layout.Content>
    </>
  )
}

export default CreateBlog;