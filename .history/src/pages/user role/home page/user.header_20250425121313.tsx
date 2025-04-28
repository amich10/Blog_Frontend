
import { Input, Layout, Typography } from 'antd';



const UserHeader = () => {

  return (
    <>
    <Layout.Header className=' flex bg-gray-300! '>
        <div className='flex justify-center items-center bg-red-500 w-full'>
          <Typography.Title level={3} className='p-2 font-serif w-120'>Katha Haru</Typography.Title>
          <Input.Search placeholder="Search blogs..." enterButton />
        </div>
        
    </Layout.Header>
    </>
  )
}
export default UserHeader;
