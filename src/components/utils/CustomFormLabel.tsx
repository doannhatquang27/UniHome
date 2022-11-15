import { FormLabel, makeStyles } from "@material-ui/core";
import React from "react";

interface Props {
  content: string;
}

const useStyles = makeStyles((theme) => ({
  formLabelRoot: {
    paddingTop: 30,
    fontSize: "1rem",
    fontWeight: 700,
    textTransform: "uppercase",
    color: "#42464d",
    paddingBottom: 8,
  },
}));

const CustomFormLabel: React.FC<Props> = ({ content }) => {
  const classes = useStyles();

  return (
    <FormLabel component="legend" classes={{ root: classes.formLabelRoot }}>
      {content}
    </FormLabel>
  );
};

export default CustomFormLabel;
