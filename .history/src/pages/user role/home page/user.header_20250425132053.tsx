
import { EditOutlined, FormOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Input, Layout, MenuProps, Typography } from 'antd';
import { NavLink } from 'react-router';
import { removeLocalStorage } from '../../../utilities/helpers';
import { webStorageConstants } from '../../../constants/constants';
import { useAuth } from '../../../context/auth.context';



const UserHeader = () => {
  const {setUserDetails}=useAuth()
  const navigate = use

  const menuItems:MenuProps["items"] =[
    {
      key:1,
      label:<NavLink to={'/profile'}><UserOutlined/>Profile</NavLink>
    },
    {
      key:2,
      label:<NavLink to={'/'} onClick={(event) =>{
        event.preventDefault();
        removeLocalStorage(webStorageConstants.ACCESS)
        removeLocalStorage(webStorageConstants.REFRESH)
        setUserDetails(undefined)
        navi
      }}></NavLink>
    }
  ]

  return (
    <>
    <Layout.Header className='bg-white! flex border-b border-gray-100 m-0 rounded-md'>
       <div className='flex items-center justify-between w-full'>
       <div className='flex justify-center items-center gap-5'>
       <div className="font-serif text-2xl font-bold"><NavLink to={'/user'} className="text-black!">Writelle</NavLink></div>
          <Input.Search placeholder="Search blogs..." allowClear/>
        </div>
        <div className='flex'>
          <Button style={{border:"none", boxShadow:"none"}} size='large' iconPosition='start' icon={<FormOutlined/>}>
          <NavLink to={'/user/write'}>Create</NavLink></Button>
          <Avatar src="https://placehold.co/70x70" alt="user" className='h-10 w-10 rounded-full'/>
        </div>
       </div>
        
    </Layout.Header>
    </>
  )
}
export default UserHeader;
