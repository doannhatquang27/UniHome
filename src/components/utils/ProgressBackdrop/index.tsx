import Backdrop from "@material-ui/core/Backdrop";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import LoadingGif from "../../../assets/images/loading.gif";

interface Props {
  isLoading: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

const SimpleBackdrop: React.FC<Props> = ({ isLoading }) => {
  const classes = useStyles();

  return (
    <div>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <img src={LoadingGif} alt="loading" width="400px" />
      </Backdrop>
    </div>
  );
};

export default SimpleBackdrop;
