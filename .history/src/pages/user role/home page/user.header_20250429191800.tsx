
import { EditOutlined, FormOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Input, Layout, MenuProps, Typography } from 'antd';
import { NavLink, useNavigate } from 'react-router';
import { removeLocalStorage } from '../../../utilities/helpers';
import { webStorageConstants } from '../../../constants/constants';
import { useAuth } from '../../../context/auth.context';
import { useEffect, useState } from 'react';
import userSvc from '../../../services/user.service';
import { IUserType } from '../../../interfacers or types/interfaces';



const UserHeader = () => {
  const {setUserDetails}=useAuth()
  const navigate = useNavigate()
  const [search, setSearch] = useState<string>("");
  

  const [users, setUsers] = useState<IUserType[]>([])
  const retrieveUsers = async() =>{
    try {
      const response = await userSvc.getRequest('user/all')
      setUsers(response.result.data)
    } catch (exception) {
      console.log(exception)
    }
  }
  
  useEffect(() =>{
    retrieveUsers()
  },[])

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
    <Layout.Header className='bg-white! flex border-b border-gray-100 m-0 rounded-md '>
       <div className='flex items-center justify-between w-full'>
       <div className='flex justify-center items-center gap-5'>
       <div className="font-serif text-2xl font-bold"><NavLink to={'/user/posts'} className="text-[#4f6f52]!">Writelle</NavLink></div>
         {/*  <Input.Search placeholder="Search blogs..."
           allowClear
           onChange={(e)=>setSearch(e.target.value)}
           /> */}
        </div>
        <div className='flex'>
          <Button style={{border:"none", boxShadow:"none"}} size='large' iconPosition='start' icon={<FormOutlined/>} className='text-black! hover:text-black!'>
          <NavLink to={'/user/posts/create'}>Create</NavLink></Button>
          <Dropdown
            menu={{ items: menuItems }}
            placement="bottomCenter"
            trigger={['click']}
          >
            <Avatar
              src={users.}
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
