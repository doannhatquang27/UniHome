import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);

const SimpleAlerts = ({ visible }: { visible: any }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert variant="outlined" severity="error" >
        This is an error alert — check it out!
      </Alert>
      <Alert variant="outlined" severity="success">
        This is a success alert — check it out!
      </Alert>
    </div>
  );
}

export default SimpleAlerts