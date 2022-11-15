import {
  MenuItem,
  OutlinedTextFieldProps,
  TextField,
  TextFieldProps,
} from "@material-ui/core";
import { FormikValues, useField, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { OptionProps } from "..";

const DistrictWrapper = ({
  name,
  options,
  ...otherProps
}: {
  name: string;
  options: OptionProps[];
  label?: string;
  style?: any;
}) => {
  const {
    setFieldValue,
    values: { building },
  } = useFormikContext<FormikValues>();
  const [field, meta] = useField(name);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (Object.keys(building).length > 0) {
      setValue(building.districtId);
      setFieldValue(name, building.districtId);
    } else {
      setValue("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [building]);

  const handleChange = (event: any) => {
    const { value } = event.target;
    setValue(value);
    setFieldValue(name, value);
  };

  const configSelect: TextFieldProps | OutlinedTextFieldProps = {
    ...field,
    ...otherProps,
    select: true,
    variant: "outlined",
    fullWidth: true,
    value: value,
    disabled: building.districtId ? true : false,
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <TextField {...configSelect}>
      <MenuItem value="" disabled={true}>
        Chọn Quận, Huyện
      </MenuItem>
      {options.map((item: OptionProps) => (
        <MenuItem key={item.label} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default DistrictWrapper;
