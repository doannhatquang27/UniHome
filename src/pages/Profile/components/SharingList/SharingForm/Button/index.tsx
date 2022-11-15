import { Button, ButtonProps } from "@material-ui/core";
import { useFormikContext } from "formik";
import React from "react";

const ButtonWrapper = ({
  children,
  ...otherProps
}: {
  children: any;
  style?: any;
}) => {
  const { submitForm } = useFormikContext();

  const handleSubmit = () => {
    submitForm();
  };

  const configButton: ButtonProps = {
    ...otherProps,
    variant: "contained",
    onClick: handleSubmit,
  };

  return <Button {...configButton}>{children}</Button>;
};

export default ButtonWrapper;
