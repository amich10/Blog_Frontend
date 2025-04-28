
import { EditOutlined, FormOutlined } from '@ant-design/icons';
import { Avatar, Button, Input, Layout, Typography } from 'antd';
import { NavLink } from 'react-router';



const UserHeader = () => {

  return (
    <>
    <Layout.Header className='bg-white! flex '>
       <div className='flex items-center justify-between w-full'>
       <div className='flex justify-center items-center gap-5'>
       <div className="font-serif text-2xl font-bold text-black">Writelle</div>
          <Input.Search placeholder="Search blogs..." loading enterButton className=''/>
        </div>
        <div className='flex'>
          <Button style={{border:"none", boxShadow:"none"}} size='large' iconPosition='start' icon={<FormOutlined/>}>
          <NavLink to={'/user/write'}>Write</NavLink></Button>
          <Avatar src="https://placehold.co/70x70" alt="user" className='h-10 w-10 rounded-full'/>
        </div>
       </div>
        
    </Layout.Header>
    </>
  )
}
export default UserHeader;
