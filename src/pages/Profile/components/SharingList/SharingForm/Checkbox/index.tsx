import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@material-ui/core";
import { useField, useFormikContext } from "formik";
import React from "react";
const CheckboxWrapper = ({
  name,
  label,
  legend,
  ...otherProps
}: {
  name: string;
  label: string;
  legend: any;
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (event: any) => {
    const { checked } = event.target;
    setFieldValue(name, checked);
  };

  const configCheckbox = {
    ...field,
    onChange: handleChange,
  };

  const configFormControl = { error: false };

  if (meta && meta.error && meta.touched) {
    configFormControl.error = true;
  }

  return (
    <FormControl {...configFormControl}>
      <FormLabel component="legend">{legend}</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox></Checkbox>}
          label={label}
        ></FormControlLabel>
      </FormGroup>
    </FormControl>
  );
};

export default CheckboxWrapper;
