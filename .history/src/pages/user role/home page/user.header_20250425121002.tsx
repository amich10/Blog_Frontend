
import { Input, Layout, Typography } from 'antd';



const UserHeader = () => {

  return (
    <>
    <Layout.Header className=' flex bg-gray-300! '>
        <div className='flex justify-center items-cente'>
          <Typography.Title level={3} className='p-2 font-serif '>Katha Haru</Typography.Title>
          <Input.Search placeholder="Search blogs..." enterButton />
        </div>
        
    </Layout.Header>
    </>
  )
}
export default UserHeader;
