
import { Input, Layout, Typography } from 'antd';



const UserHeader = () => {

  return (
    <>
    <Layout.Header className=' flex bg-gray-300! '>
        <div className='flex justify-center items-center'>
          <Typography.Title level={3} className='font-serif! w-60'>Katha Haru</Typography.Title>
          <Input.Search placeholder="Search blogs..." enterButton />
        </div>
        
    </Layout.Header>
    </>
  )
}
export default UserHeader;
