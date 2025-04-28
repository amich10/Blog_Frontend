
import { EditOutlined, FormOutlined } from '@ant-design/icons';
import { Button, Input, Layout, Typography } from 'antd';
import { NavLink } from 'react-router';



const UserHeader = () => {

  return (
    <>
    <Layout.Header className='bg-white! flex '>
       <div className='flex items-center ju'>
       <div className='flex justify-center items-center'>
          <Typography.Title level={3} className='font-serif! w-60'>Katha Haru</Typography.Title>
          <Input.Search placeholder="Search blogs..." enterButton />
        </div>
        <div className='flex gap-5'>
          <Button icon={<FormOutlined/>}><NavLink to={'/user/write'}>Write</NavLink></Button>
          <img src="https://placehold.co/60x60" alt="user" className='h-10 w-10 rounded-full'/>
        </div>
       </div>
        
    </Layout.Header>
    </>
  )
}
export default UserHeader;
