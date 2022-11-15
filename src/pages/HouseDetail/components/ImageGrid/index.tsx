import { Skeleton } from "@material-ui/lab";
import React from "react";
import FiveImageGrid from "./Five";
import FivePlusImageGrid from "./FivePlus";
import FourImageGrid from "./Four";
import "./index.scss";
import OneImageGrid from "./One";
import ThreeImageGrid from "./Three";
import TwoImageGrid from "./Two";

interface Props {
  imageList: string[];
}

const ImageGrid: React.FC<Props> = ({ imageList }) => {
  function renderGrid() {
    switch (imageList.length) {
      case 0:
        return (
          <Skeleton variant="rect" animation="wave" height={400} width="100%" />
        );
      case 1:
        return <OneImageGrid imageList={imageList} />;
      case 2:
        return <TwoImageGrid imageList={imageList} />;
      case 3:
        return <ThreeImageGrid imageList={imageList} />;
      case 4:
        return <FourImageGrid imageList={imageList} />;
      case 5:
        return <FiveImageGrid imageList={imageList} />;
      default:
        return <FivePlusImageGrid imageList={imageList} />;
    }
  }

  return <React.Fragment>{renderGrid()}</React.Fragment>;
};

export default ImageGrid;
