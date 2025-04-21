import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { type UploadProps, type UploadFile, Layout, Typography, Upload, Button } from "antd";
import { useState } from "react";
import categorySVc from "../../services/category.service";
import notifcation, { NotificationType } from "../../utilities/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  InputLabel,
  TextInputController,
} from "../../components/input.component";
import { PiUploadLight } from "react-icons/pi";

interface ICategory {
  title: string;
  status: string;
  image: string | null;
}

const AddCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const addCategorySchema = Yup.object({
    title: Yup.string().min(2).max(50).required(),
    status: Yup.string().required(),
    image: Yup.mixed().nullable(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      title: "",
      status: "",
      image: null,
    },
    resolver: yupResolver(addCategorySchema),
  });

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
      setValue("image", null);
    },
    beforeUpload: (file) => {
      console.log("FILE SELECTED", file);
      setFileList([file]);
      setValue("image", file as any);
      return false;
    },
    fileList,
  };

  const submitHandler = async (data: ICategory) => {
    setLoading(true);
    try {
      await categorySVc.patchRequest("/category/create", data, { file: true });
      notifcation("New category created", NotificationType.SUCCESS);
    } catch (exception) {
      notifcation(
        "Sorry category cannot be crated now.Please, try again later",
        NotificationType.ERROR
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Layout.Content className="p-8 bg-white rounder-md shadow-xl ">
        <form onSubmit={handleSubmit(submitHandler)}>
        <div className="border-b pb-4 mb-6">
          <Typography.Title
            level={2}
            className="!text-2xl font-semibold text-gray-800"
          >
            Create Category
          </Typography.Title>
        </div>
        <div>
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
            <InputLabel htmlFor="title" classses={" w-full sm:w-1/3"}>
              Title
            </InputLabel>
            <TextInputController
              classes={"w -full sm:w-2/3"}
              name="title"
              control={control}
              errorMsg={errors?.title?.message}
              type="text"
            ></TextInputController>
          </div>
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2">
            <InputLabel htmlFor="status" classses={" w-full sm:w-1/3"}>
              Status
            </InputLabel>
            <TextInputController
              classes={"w -full sm:w-2/3"}
              name="status"
              control={control}
              errorMsg={errors?.status?.message}
              type="text"
            ></TextInputController>
          </div>
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:mb-2 sm:mr-4">
             <div className="w-full sm:w-1/3">
             <InputLabel htmlFor="image">
                Profile Image
              </InputLabel>
             </div>
             <div className="w-full">
             <Upload {...props}>
                <Button icon={<PiUploadLight />}>
                  Select Image
                </Button>
              </Upload>
             </div>
            </div>
            <div className="text-center mt-3">
            <Button
              type="default"
              htmlType="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
              className="border-2 border-blue-600! w-40 h-9 text-[17px] text-blue-600!"
            >
              {isSubmitting ? 'Creating...' : 'Create'}
            </Button>
          </div>
        </div>
      </Layout.Content>
    </>
  );
};

export default AddCategory;
