import { Button, Input, Upload, Form, Layout, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../../context/auth.context";
import userSvc from "../../services/user.service";

const EditProfile = () => {

    const {handle}
    const { userDetails, setUserDetails } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    };

    return (
        <Layout.Content>
            <main className="w-full mx-auto px-4 py-4 bg-white">
                <form >


                </form>
            </main>
        </Layout.Content>
    );
};

export default EditProfile;
