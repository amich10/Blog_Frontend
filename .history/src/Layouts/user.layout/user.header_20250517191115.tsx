
import {LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Layout, MenuProps } from 'antd';
import { NavLink, useNavigate } from 'react-router';
import { useAuth } from '../../context/auth.context';



const UserHeader = () => {
  const {userDetails,setUserDetails}=useAuth()
  const navigate = useNavigate()


  const menuItems:MenuProps["items"] =[
    {
      key:1,
      label:<NavLink to={'/blogs/my-profile'}><UserOutlined/> Profile</NavLink>
    },
    {
      key:2,
      label:<NavLink to={'/'} onClick={(event) =>{
        event.preventDefault();
        REMO(webStorageConstants.ACCESS)
        removeLocalStorage(webStorageConstants.REFRESH)
        setUserDetails(undefined)
        navigate('/')
      }}><LogoutOutlined/> Signout</NavLink>
    }
  ]

  return (
    <>
    <Layout.Header className='bg-white! flex border-b border-gray-100 m-0 rounded-md '>
       <div className='flex items-center justify-between w-full'>
       <div className='flex justify-center items-center gap-5'>
       <div className="font-serif text-2xl font-bold"><NavLink to={'/blogs'} className="text-[#4f6f52]!">Writelle</NavLink></div>
        </div>
        <div className='flex'>
          <Dropdown
            menu={{ items: menuItems }}
            placement="bottomCenter"
            trigger={['click']}
          >
            <Avatar
              src={userDetails?.image?.optimizedUrl}
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
