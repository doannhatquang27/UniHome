import axios from "axios";
import * as L from "leaflet";
import IPoiList from "../interfaces/UniHouseApiInterfaces/IPoiList";

export const callTradeZoneMapAPI = async (bounds: L.LatLngBounds) => {
  let result: IPoiList | undefined;
  let northEast = bounds.getNorthEast();
  let northWest = bounds.getNorthWest();
  let southEast = bounds.getSouthEast();
  let southWest = bounds.getSouthWest();

  northEast.lng += 0.008;
  northEast.lat += 0.004;

  southEast.lng += 0.008;
  southEast.lat -= 0.004;

  southWest.lng -= 0.008;
  southWest.lat -= 0.004;

  northWest.lng -= 0.008;
  northWest.lat += 0.004;

  const coordinateString =
    northEast.lng +
    " " +
    northEast.lat +
    ", " +
    southEast.lng +
    " " +
    southEast.lat +
    ", " +
    southWest.lng +
    " " +
    southWest.lat +
    ", " +
    northWest.lng +
    " " +
    northWest.lat +
    ", " +
    northEast.lng +
    " " +
    northEast.lat;
  await axios
    .get(
      "https://stg-api.unihome.vn/api/third-parties/trade-zone-map?coordinateString=" +
        encodeURIComponent(coordinateString)
    )
    .then((response) => {
      result = response.data as IPoiList;
    })
    .catch((error) => console.error(error));
  return result;
};
