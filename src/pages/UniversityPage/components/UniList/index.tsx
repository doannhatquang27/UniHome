import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import IUniversity from "../../../../interfaces/UniHouseApiInterfaces/IUniversity";
import UniItem from "../UniItem";
import "./index.scss";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

export interface UniverityItem {
  name: string;
  address: string;
  image: string;
}

interface Props {
  universityList: IUniversity[];
  currentUniversity: IUniversity | undefined;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    carousel: {
      "& > .react-multiple-carousel__arrow": {
        zIndex: 2,
      },
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

const UniList: React.FC<Props> = ({ universityList, currentUniversity }) => {
  const classes = useStyles();

  if (universityList.length > 0) {
    return (
      <div className="uni-list">
        <div className="uni-list_title">
          <span>Danh sách trường</span>
        </div>
        <Carousel
          responsive={responsive}
          renderButtonGroupOutside={true}
          containerClass={classes.carousel}
          draggable={false}
          slidesToSlide={4}
        >
          {universityList.map((item, index) => (
            <UniItem
              key={index}
              university={item}
              selected={
                currentUniversity &&
                item.universityId === currentUniversity.universityId
                  ? true
                  : false
              }
            />
          ))}
        </Carousel>
      </div>
    );
  } else {
    return null;
  }
};

export default UniList;
