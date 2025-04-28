
import { Layout, Typography } from 'antd';



const UserHeader = () => {

  return (
    <>
    <Layout.Header className='bg-white!'>
        <div className="flex items-center justify-between">
            <Typography.Text className="text-lg font-semibold">Welcome, User!</Typography.Text>
            <div className="flex items-center space-x-4">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Profile
                </button>
                <button className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400">
                    Logout
                </button>
            </div>
        </div>
    </Layout.Header>
    </>
  )
}
export default UserHeader;
