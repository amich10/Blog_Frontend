import { Layout } from "antd";


const CreateBlog = () =>{
  return (
    <>
    <Layout.Content className="rounded-md h-full p-6 flex justify-center items-center bg-white">
      <div className="bg-white border rounded-md container mx-auto">
        <div>
        Create a new blog post
        </div>
      </div>
    </Layout.Content>
    </>
  )
}

export default CreateBlog;