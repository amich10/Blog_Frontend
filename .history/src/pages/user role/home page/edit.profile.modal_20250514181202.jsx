import {
  CameraOutlined,
  EditOutlined,
  EnvironmentOutlined,
  LinkOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Upload, message } from "antd";
import { useState } from "react";
import type { UploadFile } from "antd/es/upload/interface";

const { TextArea } = Input;

export const EditProfileModal = () => {
 

  return (
    <div
      className={`fixed inset-0 z-50 transition ${
        visible ? "block" : "hidden"
      }`}
    >
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-lg relative z-10">
          <h2 className="text-2xl font-bold text-[#4f6f52] mb-6 text-center">
            Edit Profile
          </h2>

          {/* Cover Image Upload */}
          <div className="relative mb-16">
            <div className="h-40 w-full bg-gray-100 rounded-lg overflow-hidden">
              {coverImage.length > 0 ? (
                <img
                  src={URL.createObjectURL(coverImage[0].originFileObj)}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              ) : userDetails.coverImage?.optimizedUrl ? (
                <img
                  src={userDetails.coverImage.optimizedUrl}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <CameraOutlined className="text-3xl" />
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
                  {profileImage.length > 0 ? (
                    <img
                      src={URL.createObjectURL(profileImage[0].originFileObj)}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : userDetails.image?.optimizedUrl ? (
                    <img
                      src={userDetails.image.optimizedUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <UserOutlined className="text-2xl" />
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

          {/* Form */}
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
                rules={[{ required: true, message: "Please input your full name!" }]}
              >
                <Input placeholder="Enter your full name" />
              </Form.Item>

              <Form.Item
                label="Username"
                name="userName"
                rules={[{ required: true, message: "Please input your username!" }]}
              >
                <Input placeholder="Enter your username" />
              </Form.Item>
            </div>

            <Form.Item label="Bio" name="bio">
              <TextArea rows={4} placeholder="Tell us about yourself..." maxLength={250} showCount />
            </Form.Item>

            <Form.Item label="Address" name="address">
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
    </div>
  );
};
