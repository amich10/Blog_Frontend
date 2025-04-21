const ChangePasswordPage = () =>{
return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-bold text-center mb-6">Change Password</h2>
            <form className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-2">Current Password</label>
                    <input 
                        type="password" 
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Enter current password"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">New Password</label>
                    <input 
                        type="password" 
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Enter new password"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Confirm New Password</label>
                    <input 
                        type="password" 
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Confirm new password"
                    />
                </div>
                <button 
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Update Password
                </button>
            </form>
        </div>
    </div>
    </>
)
}
export default ChangePasswordPage