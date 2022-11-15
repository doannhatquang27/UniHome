import {
  MenuItem,
  OutlinedTextFieldProps,
  TextField,
  TextFieldProps,
} from "@material-ui/core";
import { useField, useFormikContext } from "formik";
import React from "react";

const UniversityWrapper = ({
  name,
  options,
  ...otherProps
}: {
  name: string;
  options: any;
  label?: string;
  style?: any;
  disabled?: boolean;
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (event: any) => {
    const { value } = event.target;
    setFieldValue(name, value);
  };

  const configSelect: TextFieldProps | OutlinedTextFieldProps = {
    ...field,
    ...otherProps,
    select: true,
    variant: "outlined",
    fullWidth: true,
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <TextField {...configSelect}>
      {options.map((item: any) => (
        <MenuItem key={item.label} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default UniversityWrapper;
