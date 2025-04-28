
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
    <Layout.Header className="bg-white! flex border-b border-gray-100 m-0 rounded-md px-2">
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-3 md:gap-0">
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-5 w-full md:w-auto">
          <div className="font-serif text-2xl font-bold">
            <NavLink to={'/user'} className="text-black!">Writelle</NavLink>
          </div>
          <div className="w-full md:w-auto">
            <Input.Search placeholder="Search blogs..." allowClear className="w-full md:w-64" />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <Button
            style={{ border: "none", boxShadow: "none" }}
            size="large"
            iconPosition="start"
            icon={<FormOutlined />}
            className="hidden sm:inline-flex"
          >
            <NavLink to={'/user/write'}>Create</NavLink>
          </Button>
          <Dropdown
            menu={{ items: menuItems }}
            placement="bottomCenter"
            trigger={['click']}
          >
            <Avatar
              src="https://placehold.co/70x70"
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
