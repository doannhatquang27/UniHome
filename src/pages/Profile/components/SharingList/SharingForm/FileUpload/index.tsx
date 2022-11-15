import { useFormikContext } from "formik";
import React from "react";

const FileUpload = ({
  name,
  ...otherProps
}: {
  name: string;
  label?: string;
  type?: string;
}) => {
  const { setFieldValue } = useFormikContext();

  const handleChange = (event: any) => {
    const files = event.target.files;
    let myFiles = Array.from(files!);
    setFieldValue("images", myFiles);
    setFieldValue("imageList", files);
  };

  return (
    <input id={name} type="file" hidden onChange={handleChange} multiple />
  );
};

export default FileUpload;
