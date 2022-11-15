import React from "react";
import {
  OutlinedTextFieldProps,
  StandardTextFieldProps,
  TextField,
} from "@material-ui/core";
import { FormikValues, useField, useFormikContext } from "formik";

const TextfieldWrapper = ({
  name,
  ...otherProps
}: {
  name: string;
  label?: string;
  type?: string;
  multiline?: any;
}) => {
  const {
    values: { maxPeople },
  } = useFormikContext<FormikValues>();
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
  if (field.value > maxPeople) {
    configTextField.error = true;
    configTextField.helperText =
      "Số người ở hiện tại không được quá số người ở tối đa";
  }

  return <TextField {...configTextField} />;
};

export default TextfieldWrapper;
