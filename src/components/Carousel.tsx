import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import IHouse from "../interfaces/UniHouseApiInterfaces/IHouse";
import HouseCard from "../pages/HomePage/components/Main/HouseCard";

interface Props {
  houseList: IHouse[];
}

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    carousel: {
      "& > .react-multiple-carousel__arrow--left": {
        left: 0,
      },
      "& > .react-multiple-carousel__arrow--right": {
        right: 0,
      },
    },
    item: {
      padding: 7,
      height: "100%",
      boxSizing: "border-box",
    },
  })
);

const CarouselCustom: React.FC<Props> = ({ houseList }) => {
  const classes = useStyles();
  return (
    <Carousel
      responsive={responsive}
      renderButtonGroupOutside={true}
      containerClass={classes.carousel}
    >
      {houseList.map((house) => (
        <div key={house.houseId} className={classes.item}>
          <HouseCard house={house} />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselCustom;
