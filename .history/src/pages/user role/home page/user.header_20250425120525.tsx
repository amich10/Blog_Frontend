
import { Input, Layout, Typography } from 'antd';



const UserHeader = () => {

  return (
    <>
    <Layout.Header className=' flex bg-gray-300! '>
        <Typography.Title  level={3} className='p-2 font-serif'>Katha Haru</Typography.Title>
        <Input.Search enterButton="search"/>
        
    </Layout.Header>
    </>
  )
}
export default UserHeader;
