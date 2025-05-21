import { useEffect, useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router";

const ActivateAccountPage = () => {
  const [loading] = useState<boolean>();
  const params = useParams();
  const navigate = useNavigate();

  const activateAccount = async () => {
    try {
      const response = await auth.getRequest(
        "/auth/activate/"+ params.activationToken
      );
      notifcation(response?.result?.message, NotificationType.SUCCESS);
    } catch (exception) {
      console.log(exception);
      notifcation(
        "Sorry, your account cannot be activated at this time. Please, try again later",
        NotificationType.ERROR
      );
    } finally {
      navigate("/");
    }
  };

  useEffect(() => {
    activateAccount();
  }, []);

  return (
    <>
      {loading ? (
        <Spin
          tip="Activating your account. Please hold on."
          fullscreen
          indicator={<LoadingOutlined />}
          size="large"
        ></Spin>
      ) : (
        <></>
      )}
    </>
  );
};

export default ActivateAccountPage;
