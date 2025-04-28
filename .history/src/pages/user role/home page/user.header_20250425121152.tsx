
import { Input, Layout, Typography } from 'antd';



const UserHeader = () => {

  return (
    <>
    <div className='flex justify-between items-center bg-red-500 w-full px-4'>
      <Typography.Title level={3} className='font-serif m-0'>Katha Haru</Typography.Title>
      <Input.Search placeholder="Search blogs..." enterButton />
    </div>
        
    </Layout.Header>
    </>
  )
}
export default UserHeader;
