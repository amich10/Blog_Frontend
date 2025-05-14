import { Button, Input, Upload, Form, Layout, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../../context/auth.context";

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

            const updatedUser = await user.putRequest(`user/${userDetails._id}/update`, formData);
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
            <main className="w-max-3xl mx-auto px-4 py-4 bg-white">
                <h1 className="text-2xl font-bold text-[#4f6f52] mb-6">Edit Profile</h1>
                <Form layout="vertical" onFinish={onFinish} initialValues={userDetails}>
                    <Form.Item label="Full Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please enter a username' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Bio" name="bio">
                        <Input.TextArea rows={4} />
                    </Form.Item>

                    <Form.Item label="Address" name="address">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Social Media Link" name="socialMedia">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Profile Picture" name="profileImage" valuePropName="file">
                        <Upload beforeUpload={() => false} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Upload Profile Picture</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item label="Cover Image" name="coverImage" valuePropName="file">
                        <Upload beforeUpload={() => false} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Upload Cover Image</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} className="bg-[#4f6f52] text-white rounded-xl">
                            Save Changes
                        </Button>
                        <Button className="ml-4" onClick={() => navigate("/blogs/profile")}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </main>
        </Layout.Content>
    );
};

export default EditProfile;
