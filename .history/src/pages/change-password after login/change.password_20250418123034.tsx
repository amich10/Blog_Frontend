const ChangePasswordPage = () =>{
return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-6">Change Password</h1>
            <form className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-2">Current Password</label>
                    <input 
                        type="password"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">New Password</label>
                    <input 
                        type="password"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Confirm New Password</label>
                    <input 
                        type="password"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <button 
                    type="submit"
                    className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                    Change Password
                </button>
            </form>
        </div>
    </div>
    </>
)
}
export default ChangePasswordPage