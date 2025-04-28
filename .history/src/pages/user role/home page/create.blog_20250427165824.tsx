import { Layout } from "antd";


const CreateBlog = () =>{
  return (
    <>
    <Layout.Content className="rounded-md h-full p-6 flex justify-center items-center bg-white">
      <div className="container mx-auto">
        <div>
        Create a new blog post
        </div>
      </div>
    </Layout.Content>
    </>
  )
}

export default CreateBlog;