const ChangePasswordPage = () =>{
const [oldPassword, setOldPassword] = useState('')
const [newPassword, setNewPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
        alert('New passwords do not match!')
        return
    }
    // Add API call to change password here
}

return (