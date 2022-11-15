import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  createStyles,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  makeStyles,
} from "@material-ui/core";
import { Close, GolfCourse, Restaurant, School } from "@material-ui/icons";
import * as L from "leaflet";
import React, { FC, useEffect, useState } from "react";
import LeafletMap from "../../../../../components/utils/LeafletMap";
import IPoiList, {
  IPoiListFeature,
} from "../../../../../interfaces/UniHouseApiInterfaces/IPoiList";
import { callTradeZoneMapAPI } from "../../../../../services/third-party-services";
import { getDistanceFromLatLon } from "../../../../../services/utils/distance";
import { filterPoiByType, PoiType } from "../poimapFilter";
import "./index.scss";

interface Props {
  latitude: number;
  longitude: number;
  placeName: string;
  handleClose: () => void;
}

const captializeName = (name: string) => {
  const words = name.split(" ");
  for (let i = 0; i < words.length; i++) {
    if (words[i] && words[i].length > 1) {
      words[i] = words[i][0].toUpperCase() + words[i].substring(1) + " ";
    }
  }
  return words;
};

const PoiMapModal: FC<Props> = ({
  latitude,
  longitude,
  placeName,
  handleClose,
}) => {
  const [poiId, setPoiId] = useState<number | null>(null);
  const [poiList, setPoiList] = useState<IPoiList>();
  const [filteredPoiList, setFilteredPoiList] = useState<IPoiListFeature[]>([]);
  const [bounds, setBounds] = useState<L.LatLngBounds>();
  const [selectedType, setSelectedType] = useState<PoiType[]>([]);
  const [key, setKey] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    const fetchNewPoiList = async () => {
      const latlng: L.LatLngTuple = [latitude, longitude];
      const latLngBoundsLiteral: L.LatLngBoundsLiteral = [latlng];
      const bounds = new L.LatLngBounds(latLngBoundsLiteral);
      const result = await callTradeZoneMapAPI(bounds);
      if (result) {
        setPoiList(result);
        setFilteredPoiList(result.features);
      }
    };
    fetchNewPoiList();
  }, [latitude, longitude]);

  useEffect(() => {
    if (poiList) {
      if (selectedType.length > 0) {
        const filteredItems = filterPoiByType(poiList, selectedType);
        if (filteredItems.length > 0) {
          setFilteredPoiList(filteredItems);
        }
      } else {
        setFilteredPoiList(poiList.features);
      }
    }
  }, [poiList, selectedType, key]);

  const handleChangeFilter = (type: PoiType) => {
    let tempTypeList = selectedType;
    tempTypeList.push(type);
    setSelectedType(tempTypeList);
    setKey(key + 1);
  };

  const handleDeleteType = (type: PoiType) => {
    let tempTypeList = selectedType;
    tempTypeList = tempTypeList.filter((item) => item !== type);
    setSelectedType(tempTypeList);
    setKey(key + 1);
  };

  return (
    <Card className="poi-map-model-card">
      <CardHeader
        title="Bản đồ"
        action={
          <IconButton aria-label="settings" onClick={handleClose}>
            <Close className="card-header_icon" />
          </IconButton>
        }
        className="card-header"
      />
      <CardContent className="card-content">
        <Grid container style={{ marginTop: 16 }}>
          <Grid item xs={3} className="map-list-scroll-bar">
            <List classes={{ root: classes.listRoot }}>
              {filteredPoiList &&
                filteredPoiList.map((item, index) => (
                  <React.Fragment key={index}>
                    <ListItem
                      button
                      selected={poiId === item.properties.f4}
                      onClick={() => setPoiId(item.properties.f4)}
                      style={{
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                      }}
                    >
                      <span style={{ fontWeight: 900 }}>
                        {captializeName(item.properties.f2)}
                      </span>
                      <span>
                        Khoảng cách:{" "}
                        {getDistanceFromLatLon(
                          latitude,
                          longitude,
                          item.geometry.coordinates[0][1],
                          item.geometry.coordinates[0][0]
                        )}
                      </span>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
            </List>
          </Grid>
          <Grid item xs={9} className="map">
            <LeafletMap
              lat={latitude}
              lng={longitude}
              rentName={placeName}
              filteredPoiList={filteredPoiList}
              poiId={poiId}
              setBounds={setBounds}
            />
            <div className="map_chip-container">
              {selectedType.includes(PoiType.Food) ? (
                <Chip
                  icon={<Restaurant />}
                  label="Ăn uống"
                  variant="default"
                  onClick={() => handleChangeFilter(PoiType.Food)}
                  onDelete={() => handleDeleteType(PoiType.Food)}
                  classes={{ root: classes.chipRoot }}
                />
              ) : (
                <Chip
                  icon={<Restaurant />}
                  label="Ăn uống"
                  variant="default"
                  onClick={() => handleChangeFilter(PoiType.Food)}
                  classes={{ root: classes.chipRoot }}
                />
              )}

              {selectedType.includes(PoiType.Edu) ? (
                <Chip
                  icon={<School />}
                  label="Học tập"
                  variant="default"
                  onClick={() => handleChangeFilter(PoiType.Edu)}
                  onDelete={() => handleDeleteType(PoiType.Edu)}
                  classes={{ root: classes.chipRoot }}
                />
              ) : (
                <Chip
                  icon={<School />}
                  label="Học tập"
                  variant="default"
                  onClick={() => handleChangeFilter(PoiType.Edu)}
                  classes={{ root: classes.chipRoot }}
                />
              )}

              {selectedType.includes(PoiType.Fun) ? (
                <Chip
                  icon={<GolfCourse />}
                  label="Giải trí"
                  variant="default"
                  onClick={() => handleChangeFilter(PoiType.Fun)}
                  onDelete={() => handleDeleteType(PoiType.Fun)}
                  classes={{ root: classes.chipRoot }}
                />
              ) : (
                <Chip
                  icon={<GolfCourse />}
                  label="Giải trí"
                  variant="default"
                  onClick={() => handleChangeFilter(PoiType.Fun)}
                  classes={{ root: classes.chipRoot }}
                />
              )}
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PoiMapModal;

const useStyles = makeStyles(() =>
  createStyles({
    listRoot: {
      width: "100%",
      position: "relative",
      overflow: "auto",
      height: 484,
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
    },
  })
);
