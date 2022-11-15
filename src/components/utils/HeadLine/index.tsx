import { Button } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { GetApp, Publish } from "@material-ui/icons";
import React, { useState } from "react";
import DownloadAppModal from "../DownloadAppModal";
import "./index.scss";

const HeadLine = () => {
  const classes = useStyles();
  const [displayInstallModal, setDisplayInstallModal] = useState(false);

  const openModal = () => {
    setDisplayInstallModal(true);
  };

  const closeModal = () => {
    setDisplayInstallModal(false);
  };

  return (
    <React.Fragment>
      <div className="appbar-headline">
        <Button
          classes={{ root: classes.headlineButton }}
          startIcon={<GetApp />}
          onClick={openModal}
        >
          Tải app
        </Button>
        <Button
          classes={{ root: classes.headlineButton }}
          startIcon={<Publish />}
          onClick={openModal}
        >
          Đăng phòng ở ghép
        </Button>
      </div>
      <DownloadAppModal open={displayInstallModal} onClose={closeModal} />
    </React.Fragment>
  );
};

export default HeadLine;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headlineButton: {
      color: "white",
      margin: "0 10px",
      "&:hover": {
        backgroundColor: "#16a596",
      },
      textTransform: "unset",
    },
  })
);
