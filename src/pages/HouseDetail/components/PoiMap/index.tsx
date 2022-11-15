import { createStyles, Grid, makeStyles, Modal } from "@material-ui/core";
import * as L from "leaflet";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { IPoiListFeature } from "../../../../interfaces/UniHouseApiInterfaces/IPoiList";
import { callTradeZoneMapAPI } from "../../../../services/third-party-services";
import "./index.scss";
import PoiItem from "./PoiItem";
import PoiMapModal from "./PoiMapModal";

interface Props {
  latitude: number;
  longitude: number;
  placeName: string;
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

const PoiMap: React.FC<Props> = ({ latitude, longitude, placeName }) => {
  const [filteredPoiList, setFilteredPoiList] = useState<IPoiListFeature[]>([]);
  const [displayModal, setDisplayModal] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const fetchNewPoiList = async () => {
      const latlng: L.LatLngTuple = [latitude, longitude];
      const latLngBoundsLiteral: L.LatLngBoundsLiteral = [latlng];
      const bounds = new L.LatLngBounds(latLngBoundsLiteral);
      const result = await callTradeZoneMapAPI(bounds);
      if (result) {
        setFilteredPoiList(result.features);
      }
    };
    fetchNewPoiList();
  }, [latitude, longitude]);

  return (
    <React.Fragment>
      <span className="title">Địa điểm lân cận</span>
      <Grid container style={{ marginTop: 16 }}>
        <Grid item xs={12}>
          <Carousel
            responsive={responsive}
            renderButtonGroupOutside={true}
            containerClass={classes.carousel}
            draggable={false}
            slidesToSlide={4}
          >
            {filteredPoiList &&
              filteredPoiList.map((item, index) => (
                <div
                  key={index}
                  className={classes.item}
                  onClick={() => setDisplayModal(true)}
                >
                  <PoiItem
                    poi={item}
                    latitude={latitude}
                    longitude={longitude}
                  />
                </div>
              ))}
          </Carousel>
        </Grid>
      </Grid>
      <Modal open={displayModal} onClose={() => setDisplayModal(false)}>
        <PoiMapModal
          latitude={latitude}
          longitude={longitude}
          placeName={placeName}
          handleClose={() => setDisplayModal(false)}
        />
      </Modal>
    </React.Fragment>
  );
};

export default PoiMap;

const useStyles = makeStyles(() =>
  createStyles({
    listRoot: {
      width: "100%",
      position: "relative",
      overflow: "auto",
      height: 284,
    },
    chipRoot: {
      backgroundColor: "white",
      marginRight: "1em",
    },
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
      cursor: "pointer",
    },
  })
);
