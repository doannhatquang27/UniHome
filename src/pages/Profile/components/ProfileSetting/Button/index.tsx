import { Button, ButtonProps } from "@material-ui/core";
import { useFormikContext } from "formik";
import React from "react";

const ButtonWrapper = ({
  children,
  isSubmit,
  values,
  onCancel,
  ...otherProps
}: {
  children: any;
  style?: any;
  values?: any;
  isSubmit: boolean;
  onCancel?: any;
}) => {
  const { submitForm, setValues } = useFormikContext();

  const handleCancel = () => {
    setValues(values);
    onCancel();
  };

  const configButton: ButtonProps = {
    ...otherProps,
    variant: isSubmit ? "contained" : "outlined",
    onClick: isSubmit ? submitForm : handleCancel,
  };

  return <Button {...configButton}>{children}</Button>;
};

export default ButtonWrapper;
