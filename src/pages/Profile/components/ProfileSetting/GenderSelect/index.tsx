import {
  MenuItem,
  OutlinedTextFieldProps,
  TextField,
  TextFieldProps,
} from "@material-ui/core";
import { useField, useFormikContext } from "formik";
import React from "react";

interface OptionProps {
  label: string;
  value: number;
}

const GenderSelect = ({
  name,
  ...otherProps
}: {
  name: string;
  label?: string;
  style?: any;
  disabled?: boolean;
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const options: OptionProps[] = [
    { label: "Nam", value: 0 },
    { label: "Nữ", value: 1 },
  ];

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

export default GenderSelect;
