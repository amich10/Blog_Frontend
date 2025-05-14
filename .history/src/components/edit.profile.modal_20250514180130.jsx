import {
  CameraOutlined,
  EditOutlined,
  EnvironmentOutlined,
  LinkOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Upload, message } from "antd";
import React, { useState } from "react";

const { TextArea } = Input;

const EditProfileModal = ({ visible, onCancel, onSave, userDetails }) => {
  const [form] = Form.useForm();
const EditProfileModal = ({ visible, onCancel, onSave, userDetails }) => {
  const [form] = Form.useForm();
  const [coverImage, setCoverImage] = useState([]);
  const [profileImage, setProfileImage] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCoverImageChange = ({ fileList }) => {
    setCoverImage(fileList);
  };

  const handleProfileImageChange = ({ fileList }) => {
    setProfileImage(fileList);
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
    }
    return isImage;
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Here you would typically handle the image uploads and form submission
      // For now, we'll just pass the form values and file lists
      await onSave({
        ...values,
        coverImage: coverImage[0]?.originFileObj,
        profileImage: profileImage[0]?.originFileObj,
      });
      message.success('Profile updated successfully!');
      onCancel();
    } catch (error) {
      message.error('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };
    <div className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 ${visible ? 'block' : 'hidden'}`}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-lg relative">
        <h2 className="text-2xl font-bold text-[#4f6f52] mb-6 text-center">
          Edit Profile
        </h2>
        
        {/* Cover Image Upload */}
        <div className="relative mb-16">
          <div className="h-40 w-full bg-gray-100 rounded-lg overflow-hidden">
            {userDetails.coverImage?.optimizedUrl && !coverImage.length ? (
              <img 
                src={userDetails.coverImage.optimizedUrl} 
                alt="Cover" 
                className="w-full h-full object-cover"
              />
            ) : coverImage.length ? (
              <img 
            ) : coverImage.length ? (
              <img 
                src={URL.createObjectURL(coverImage[0].originFileObj)} 
                alt="Cover" 
                className="w-full h-full object-cover"
              />
            ) : (
              </div>
            )}
          </div>
          <Upload
            accept="image/*"
            beforeUpload={beforeUpload}
            onChange={handleCoverImageChange}
            fileList={coverImage}
            maxCount={1}
            showUploadList={false}
            className="absolute top-2 right-2"
          >
            <Button 
              icon={<EditOutlined />} 
              shape="circle" 
              className="bg-white shadow-md"
            />
          </Upload>
          
          {/* Profile Image Upload */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <div className="h-24 w-24 rounded-full border-4 border-white bg-gray-100 overflow-hidden">
                {userDetails.image?.optimizedUrl && !profileImage.length ? (
                  <img 
                    src={userDetails.image.optimizedUrl} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : profileImage.length ? (
                  <img 
                ) : profileImage.length ? (
                  <img 
                    src={URL.createObjectURL(profileImage[0].originFileObj)} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  </div>
                )}
              </div>
              <Upload
                accept="image/*"
                beforeUpload={beforeUpload}
                onChange={handleProfileImageChange}
                fileList={profileImage}
                maxCount={1}
                showUploadList={false}
                className="absolute bottom-0 right-0"
              >
                <Button 
                  icon={<EditOutlined />} 
                  shape="circle" 
                  size="small" 
                  className="bg-white shadow-md"
                />
              </Upload>
            </div>
          </div>
        </div>

        <Form
          form={form}
          layout="vertical"
          initialValues={{
            fullName: userDetails.name,
            userName: userDetails.username,
            bio: userDetails.bio,
            address: userDetails.address,
            socialMedia: userDetails.socialMedia,
          }}
          onFinish={onFinish}
          className="mt-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[{ required: true, message: 'Please input your full name!' }]}
            >
              <Input placeholder="Enter your full name" />
            </Form.Item>

            <Form.Item
              label="Username"
              name="userName"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder="Enter your username" />
            </Form.Item>
          </div>

          <Form.Item
            label="Bio"
            name="bio"
          >
            <TextArea 
              rows={4} 
              placeholder="Tell us about yourself..." 
              maxLength={250} 
              showCount 
            />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
          >
            <Input 
              placeholder="Enter your address" 
              prefix={<EnvironmentOutlined className="text-gray-400" />} 
            />
          </Form.Item>

          <Form.Item
            label="Social Media Links"
            name="socialMedia"
            extra="Please enter full URL (e.g., https://twitter.com/username)"
          >
            <Input 
              placeholder="https://example.com/yourprofile" 
              prefix={<LinkOutlined className="text-gray-400" />} 
            />
          </Form.Item>

          <div className="flex justify-end gap-4 mt-6">
            <Button 
              onClick={onCancel} 
              disabled={loading}
              className="px-6 py-2 border border-[#4f6f52] text-[#4f6f52] rounded-lg hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button 
              htmlType="submit" 
              loading={loading}
              className="px-6 py-2 bg-[#4f6f52] text-white rounded-lg hover:bg-[#3e5742]"
            >
              Save Changes
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

// Usage in your ProfilePage component:
// Add this state and handlers to your existing component
const [editModalVisible, setEditModalVisible] = useState(false);

const handleSaveProfile = async (values) => {
  try {
    // Here you would typically make an API call to update the profile
    // For example:
    // const formData = new FormData();
    // formData.append('fullName', values.fullName);
    // formData.append('userName', values.userName);
    // ... other fields
    // if (values.profileImage) formData.append('profileImage', values.profileImage);
    // if (values.coverImage) formData.append('coverImage', values.coverImage);
    
    // const response = await userSvc.updateProfile(formData);
    // Update userDetails in your auth context
    
    message.success('Profile updated successfully!');
    setEditModalVisible(false);
  } catch (error) {
    message.error('Failed to update profile. Please try again.');
  }
};

// Then in your JSX where you have the edit button:
<Button
  onClick={() => setEditModalVisible(true)}
  className="bg-[#4f6f52] text-white rounded-xl"
>
  <EditOutlined className="mr-1" />
  Edit Profile
</Button>

<EditProfileModal
  visible={editModalVisible}
  onCancel={() => setEditModalVisible(false)}
  onSave={handleSaveProfile}
  userDetails={userDetails}
/>