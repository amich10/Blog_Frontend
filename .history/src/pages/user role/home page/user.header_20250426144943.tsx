
import { EditOutlined, FormOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Input, Layout, MenuProps, Typography } from 'antd';
import { NavLink, useNavigate } from 'react-router';
import { removeLocalStorage } from '../../../utilities/helpers';
import { webStorageConstants } from '../../../constants/constants';
import { useAuth } from '../../../context/auth.context';



const UserHeader = () => {
  const {setUserDetails}=useAuth()
  const navigate = useNavigate()

  const menuItems:MenuProps["items"] =[
    {
      key:1,
      label:<NavLink to={'/profile'}><UserOutlined/> Profile</NavLink>
    },
    {
      key:2,
      label:<NavLink to={'/'} onClick={(event) =>{
        event.preventDefault();
        removeLocalStorage(webStorageConstants.ACCESS)
        removeLocalStorage(webStorageConstants.REFRESH)
        setUserDetails(undefined)
        navigate('/')
      }}><LogoutOutlined/> Signout</NavLink>
    }
  ]

  return (
    <>
    <Layout.Header className='bg-white! flex border-b border-gray-100 m-0 rounded-md'>
       <div className='flex items-center justify-between w-full'>
       <div className='flex justify-center items-center gap-5'>
       <div className="font-serif text-2xl font-bold"><NavLink to={'/user'} className="text-[#4f6f52]!">Writelle</NavLink></div>
          <Input.Search placeholder="Search blogs..." allowClear/>
        </div>
        <div className='flex'>
          <Button style={{border:"none", boxShadow:"none"}} size='large' iconPosition='start' icon={<FormOutlined/>} className='text-black! hover:text-black!'>
          <NavLink to={'/user/write'}>Create</NavLink></Button>
          <Dropdown
            menu={{ items: menuItems }}
            placement="bottomCenter"
            trigger={['click']}
           >
            <Avatar
              src=
              alt="user"
              className="h-15 w-15 rounded-full cursor-pointer"

            />
          </Dropdown>
        </div>
       </div>
        
    </Layout.Header>
    </>
  )
}
export default UserHeader;
