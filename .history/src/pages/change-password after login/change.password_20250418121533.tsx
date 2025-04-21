import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { useAuth } from "../../context/auth.context";

const ChangePasswordPage = () => {
  const { userDetails } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (values: { oldPassword: string; newPassword: string }) => {
    setLoading(true);
    try {
      // Assuming you have an endpoint to handle password change
      const response = await authSvc.postRequest("/auth/change-password", {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });

      if (response.success) {
        notification.success({
          message: "Password Changed Successfully",
        });
      } else {
        notification.error({
          message: response.message || "Failed to change password",
        });
      }
    } catch (error) {
      notification.error({
        message: "Error changing password",
        description: error.message || "An unexpected error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="change-password-page">
      <h2>Change Password</h2>
      <Form
        name="changePasswordForm"
        initialValues={{ oldPassword: "", newPassword: "" }}
        onFinish={handleChangePassword}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Old Password"
          name="oldPassword"
          rules={[{ required: true, message: "Please input your old password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[{ required: true, message: "Please input your new password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm New Password"
          name="confirmNewPassword"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: "Please confirm your new password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePasswordPage;
