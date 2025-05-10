<Upload
  name="file" // Name of the file parameter sent to the server
  action="/upload.do" // URL of the server endpoint to handle the upload
  headers={{
    authorization: "Bearer your-auth-token", // Optional: Authorization headers
  }}
  beforeUpload={(file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      console.error("You can only upload image files!");
    }
    return isImage || Upload.LIST_IGNORE; // Return false to prevent upload
  }}
  onChange={(info) => {
    const { status } = info.file;
    if (status === "done") {
      console.log(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      console.error(`${info.file.name} file upload failed.`);
    }
  }}
  showUploadList={true} // Whether to show the uploaded file list
  multiple={false} // Allow multiple file uploads
  maxCount={1} // Limit the number of uploaded files
>
  <Button>
    <CiImageOn className="h-6 w-6 text-gray-600" />
    Upload an Image
  </Button>
</Upload>
