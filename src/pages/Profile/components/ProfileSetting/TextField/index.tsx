import {
  OutlinedTextFieldProps,
  StandardTextFieldProps,
  TextField
} from "@material-ui/core";
import { useField } from "formik";
import React from "react";

const TextfieldWrapper = ({
  name,
  ...otherProps
}: {
  name: string;
  label?: string;
  type?: string;
  disabled?: boolean;
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
