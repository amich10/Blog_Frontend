


import type { UploadProps, UploadFile } from "antd";
import { Upload,Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";




interface IFileUploadProps{
  name:string,
  setValue:(name:string, file:any) =>void;
  thumbnail?:string | null
}

export const FormSingleImageUploader = ({name,setValue,thumbnail=''}:IFileUploadProps) =>{
  const [fileList, setFileList] = useState<UploadFile[]>([]);
    
const props: UploadProps = {
  onRemove: (file) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
  },
  beforeUpload: (file) => {
    console.log(file)
    setFileList([file]);
    setValue(name, file as any)
    return false;
  },
  fileList,
};

  return (
    <>
     <div className="flex justify-start gap-10">
      <div>
        <Upload {...props}>
            <Button icon={<UploadOutlined />}>Select Image</Button>
        </Upload>
      </div>
      <div>
        {fileList && fileList.length ? (
          <><img src={URL.createObjectURL(fileList[0] as any)} alt="" className=" h-[50px] w-[50px]"/></>

          // for preloading image in edit banner
          ) : thumbnail ? <><img src={thumbnail} className="h-[100px] w-[300px]" alt="" /></>:<img src="https://placehold.co/300x75/white/teal?text=No Image" alt="alternate image"/>} 
      </div>
     </div>
    </>
  )
}