import React from "react";
import {
  OutlinedTextFieldProps,
  StandardTextFieldProps,
  TextField,
} from "@material-ui/core";
import { useField } from "formik";

const TextfieldWrapper = ({
  name,
  ...otherProps
}: {
  name: string;
  label?: string;
  type?: string;
  multiline?: any;
}) => {
  const [field, meta] = useField(name);

  const configTextField: StandardTextFieldProps | OutlinedTextFieldProps = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return <TextField {...configTextField} />;
};

export default TextfieldWrapper;
