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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { submitForm, setValues } = useFormikContext();

  const configButton: ButtonProps = {
    ...otherProps,
    variant: "contained",
    fullWidth: true,
    onClick: submitForm,
    size: "large",
  };

  return (
    <Button id="register-button" {...configButton}>
      {children}
    </Button>
  );
};

export default ButtonWrapper;
