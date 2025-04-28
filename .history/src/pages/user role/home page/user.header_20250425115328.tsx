
import { Layout, Typography } from 'antd';



const UserHeader = () => {

  return (
    <>
    <Layout.Header className='bg-white! flex '>
        <Typography.Title  level={3} className='p-2'>Welcome back, User</Typography.Title>
        
    </Layout.Header>
    </>
  )
}
export default UserHeader;
