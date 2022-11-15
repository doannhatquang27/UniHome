import { Avatar } from "@material-ui/core";
import {
  GolfCourse,
  LocalGroceryStore,
  LocationOn,
  Restaurant,
  School,
} from "@material-ui/icons";
import { FC, useEffect } from "react";
import { IPoiListFeature } from "../../../../../interfaces/UniHouseApiInterfaces/IPoiList";
import { getDistanceFromLatLon } from "../../../../../services/utils/distance";
import { getGeneralPoiType, PoiType } from "../poimapFilter";
import "./index.scss";

interface Props {
  poi: IPoiListFeature;
  latitude: number;
  longitude: number;
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

const choosePoiIcon = (poi: IPoiListFeature) => {
  const type = getGeneralPoiType(poi.properties.f1);
  switch (type) {
    case PoiType.Food:
      return <Restaurant />;
    case PoiType.Edu:
      return <School />;
    case PoiType.Fun:
      return <GolfCourse />;
    case PoiType.Shopping:
      return <LocalGroceryStore />;
    default:
      return <LocationOn />;
  }
};

const PoiItem: FC<Props> = ({ poi, latitude, longitude }) => {
  useEffect(() => {
    choosePoiIcon(poi);
  }, [poi]);

  return (
    <div className="poi-item">
      <Avatar>{choosePoiIcon(poi)}</Avatar>
      <span style={{ fontWeight: 900 }}>
        {captializeName(poi.properties.f2)}
      </span>
      <span>
        Khoảng cách:{" "}
        {getDistanceFromLatLon(
          latitude,
          longitude,
          poi.geometry.coordinates[0][1],
          poi.geometry.coordinates[0][0]
        )}
      </span>
    </div>
  );
};

export default PoiItem;
