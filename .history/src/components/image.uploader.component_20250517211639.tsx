import React from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const UploadImageField = ({ control, errors, fileList, setFileList, setValue }) => {
  const uploadProps = {
    onRemove: (file) => {
      const newFileList = fileList.filter((item) => item.uid !== file.uid);
      setFileList(newFileList);
      setValue("image", null);
    },
    beforeUpload: (file) => {
      setFileList([file]);
      setValue("image", file);
      return false;
    },
    fileList,
  };

  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-4">
      <label className="w-full sm:w-1/3">Profile Image</label>
      <div className="w-full sm:w-2/3">
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Select Image</Button>
        </Upload>
        {errors?.image?.message && <span className="text-red-500 text-sm">{errors.image.message}</span>}
      </div>
    </div>
  );
};

export default UploadImageField;
