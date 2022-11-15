import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import CustomImage from "../CustomImage";
import FullScreenImage from "../FullScreenImage";
import "./index.scss";

interface Props {
  imageList: string[];
}

const OneImageGrid: React.FC<Props> = ({ imageList }) => {
  const [open, setOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(true);
  };

  return (
    <div className="one-grid">
      <Grid container>
        <Grid item xs={12} style={{ padding: 1 }}>
          <CustomImage
            source={imageList[0]}
            isMain
            handleToggle={handleToggle}
            handleChangeUrl={() => setImageIndex(0)}
          />
        </Grid>
      </Grid>
      <FullScreenImage
        open={open}
        handleClose={handleClose}
        handlePre={() => null}
        handleNext={() => null}
        source={imageList[imageIndex]}
      />
    </div>
  );
};

export default OneImageGrid;
