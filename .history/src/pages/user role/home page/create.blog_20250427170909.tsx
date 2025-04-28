import { Layout } from "antd";


const CreateBlog = () =>{
  return (
    <>
    <Layout.Content className="container mx-auto px-6 py-8 bg-gray-500">
      <div className="max-w-4xl  mx-auto bg-white rouded-xl shadow-sm  overflow-hidden ">

        {/* form header */}
        <div className="px-8 py-6 border-b border-gray-100 ">
          <h1 className="text-2xl ">Create a New blog Post </h1>
          <p>Share your ideas and experience to the world</p>
        </div>

      </div>
    </Layout.Content>
    </>
  )
}

export default CreateBlog;