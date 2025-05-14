import { Button, Input, Upload, Form, Layout, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../../context/auth.context";
import userSvc from "../../services/user.service";

const EditProfile = () => {
    const { userDetails, setUserDetails } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        try {
            setLoading(true);

            const payload = {
                ...values,
                profileImage: values.profileImage?.file?.originFileObj,
                coverImage: values.coverImage?.file?.originFileObj,
            };

            const formData = new FormData();
            Object.keys(payload).forEach((key) => {
                if (payload[key]) {
                    formData.append(key, payload[key]);
                }
            });

            const updatedUser = await userSvc.patchRequest(`user/${userDetails._id}/update`, formData);
            message.success("Profile updated successfully!");

            setUserDetails(updatedUser.result.data);
            navigate("/blogs/profile");

        } catch (error) {
            console.error(error);
            message.error("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout.Content>
            <main className="max-w-3xl mx-auto px-6 py-8 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-[#4f6f52] mb-8">Edit Profile</h1>
            <Form
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                ...userDetails,
                profileImage: undefined,
                coverImage: undefined,
                }}
                className="space-y-6"
            >
                <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true, message: "Please enter your name" }]}
                >
                <Input placeholder="Enter your full name" />
                </Form.Item>

                <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: "Please enter a username" }]}
                >
                <Input placeholder="Choose a username" />
                </Form.Item>

                <Form.Item label="Bio" name="bio">
                <Input.TextArea rows={4} placeholder="Tell us about yourself" />
                </Form.Item>

                <Form.Item label="Address" name="address">
                <Input placeholder="Enter your address" />
                </Form.Item>

                <Form.Item label="Social Media Link" name="socialMedia">
                <Input placeholder="Paste your social media link" />
                </Form.Item>

                <Form.Item
                label="Profile Picture"
                name="profileImage"
                valuePropName="file"
                extra={userDetails?.profileImageUrl && (
                    <img
                    src={userDetails.profileImageUrl}
                    alt="Current Profile"
                    className="w-16 h-16 object-cover rounded-full mb-2"
                    />
                )}
                >
                <Upload beforeUpload={() => false} maxCount={1} accept="image/*">
                    <Button icon={<UploadOutlined />}>Upload Profile Picture</Button>
                </Upload>
                </Form.Item>

                <Form.Item
                label="Cover Image"
                name="coverImage"
                valuePropName="file"
                extra={userDetails?.coverImageUrl && (
                    <img
                    src={userDetails.coverImageUrl}
                    alt="Current Cover"
                    className="w-full h-32 object-cover rounded mb-2"
                    />
                )}
                >
                <Upload beforeUpload={() => false} maxCount={1} accept="image/*">
                    <Button icon={<UploadOutlined />}>Upload Cover Image</Button>
                </Upload>
                </Form.Item>

                <Form.Item>
                <div className="flex gap-4">
                    <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="bg-[#4f6f52] text-white rounded-xl px-8"
                    >
                    Save Changes
                    </Button>
                    <Button
                    onClick={() => navigate("/blogs/profile")}
                    className="rounded-xl px-8"
                    disabled={loading}
                    >
                    Cancel
                    </Button>
                </div>
                </Form.Item>
            </Form>
            </main>
        </Layout.Content>
    );
};

export default EditProfile;
