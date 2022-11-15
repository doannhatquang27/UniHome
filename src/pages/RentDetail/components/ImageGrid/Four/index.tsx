import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import CustomImage from "../CustomImage";
import FullScreenImage from "../FullScreenImage";
import "./index.scss";

interface Props {
  imageList: string[];
}

const FourImageGrid: React.FC<Props> = ({ imageList }) => {
  const [open, setOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(true);
  };

  const handlePre = () => {
    const length = imageList.length;
    imageIndex > 0 ? setImageIndex(imageIndex - 1) : setImageIndex(length - 1);
  };

  const handleNext = () => {
    const length = imageList.length;
    imageIndex < length - 1 ? setImageIndex(imageIndex + 1) : setImageIndex(0);
  };

  return (
    <div className="four-grid">
      <Grid container direction="row">
        <Grid item xs={6}>
          <Grid container direction="column">
            <Grid item xs={12} style={{ padding: 1 }}>
              <CustomImage
                source={imageList[0]}
                handleToggle={handleToggle}
                handleChangeUrl={() => setImageIndex(0)}
              />
            </Grid>
            <Grid item xs={12} style={{ padding: 1 }}>
              <CustomImage
                source={imageList[1]}
                handleToggle={handleToggle}
                handleChangeUrl={() => setImageIndex(1)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container direction="column">
            <Grid item xs={12} style={{ padding: 1 }}>
              <CustomImage
                source={imageList[2]}
                handleToggle={handleToggle}
                handleChangeUrl={() => setImageIndex(2)}
              />
            </Grid>
            <Grid item xs={12} style={{ padding: 1 }}>
              <CustomImage
                source={imageList[3]}
                handleToggle={handleToggle}
                handleChangeUrl={() => setImageIndex(3)}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <FullScreenImage
        open={open}
        handleClose={handleClose}
        handlePre={handlePre}
        handleNext={handleNext}
        source={imageList[imageIndex]}
      />
    </div>
  );
};

export default FourImageGrid;
