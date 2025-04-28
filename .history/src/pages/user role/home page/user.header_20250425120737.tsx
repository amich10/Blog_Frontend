
import { Input, Layout, Typography } from 'antd';



const UserHeader = () => {

  return (
    <>
    <Layout.Header className=' flex bg-gray-300! '>
        <div className='flex w-96 gap-4 justify-between bg-red-500'>
          <Typography.Title level={3} className='p-2 font-serif'>Katha Haru</Typography.Title>
          <Input.Search placeholder="Search blogs..." enterButton="Search" />
        </div>
        
    </Layout.Header>
    </>
  )
}
export default UserHeader;
