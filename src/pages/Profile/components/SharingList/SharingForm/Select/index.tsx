import {
  MenuItem,
  OutlinedTextFieldProps,
  TextField,
  TextFieldProps,
} from "@material-ui/core";
import { useField, useFormikContext } from "formik";
import React from "react";

const SelectWrapper = ({
  name,
  options,
  ...otherProps
}: {
  name: string;
  options: any;
  label?: string;
  style?: any;
  fullWidth?: any;
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
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <TextField {...configSelect}>
      {Object.keys(options).map((item, pos) => {
        return (
          <MenuItem key={pos} value={item}>
            {options[item]}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default SelectWrapper;
