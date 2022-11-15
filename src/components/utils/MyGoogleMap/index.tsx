import { Button, createStyles, makeStyles } from "@material-ui/core";
import DirectionsIcon from "@material-ui/icons/Directions";
import React from "react";
import IHouse from "../../../interfaces/UniHouseApiInterfaces/IHouse";
import "./index.scss";

interface Props {
  house: IHouse;
}

const convertAddress = (name: string) => {
  const replaceBlankSpace = name.replace(" ", "+");
  const replaceSlash = replaceBlankSpace.replace("/", ",+");
  return replaceSlash;
};

const MyGoogleMap: React.FC<Props> = ({ house }) => {
  const classes = useStyles();

  const NavigateToGM = (position: GeolocationPosition) => {
    const url = `https://www.google.com/maps/dir/${position.coords.latitude}, ${position.coords.longitude}/${house.latitude}, ${house.longitude}`;
    window.open(url, "_blank");
  };

  const handleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(NavigateToGM);
    }
  };

  return (
    <div className="my-google-map">
      <iframe
        title="google-map-unihome"
        width="100%"
        height="250"
        frameBorder="0"
        style={{ border: 0 }}
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBCxnRkV-ZX-30B2a9_B2jZSHe6xN2J3CA&q=${convertAddress(
          house.fullAddress
        )}&center=${house.latitude}, ${house.longitude}&zoom=16`}
        allowFullScreen
      ></iframe>
      <Button
        classes={{ root: classes.buttonRoot }}
        variant="outlined"
        startIcon={<DirectionsIcon />}
        fullWidth
        className="button"
        onClick={handleClick}
        size="large"
      >
        Chỉ đường
      </Button>
    </div>
  );
};

export default MyGoogleMap;

const useStyles = makeStyles(() =>
  createStyles({
    buttonRoot: {
      borderRadius: 4,
    },
  })
);
