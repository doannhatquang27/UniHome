import * as L from "leaflet";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import SmallIcon from "../../../assets/images/small-logo.png";
import { IPoiListFeature } from "../../../interfaces/UniHouseApiInterfaces/IPoiList";

interface Props {
  lat: number;
  lng: number;
  rentName: string;
  filteredPoiList: IPoiListFeature[];
  poiId: number | null;
  setBounds: (newBounds: L.LatLngBounds) => void;
}

const LeafletMap: React.FC<Props> = ({
  lat,
  lng,
  rentName,
  filteredPoiList,
  poiId,
  setBounds,
}) => {
  const [map, setMap] = useState<L.Map>();
  const markerRef = useRef<L.Marker<any>>(null);

  useEffect(() => {
    markerRef.current?.openPopup();
  }, [poiId]);

  // const updateBound = useCallback(() => {
  //   const currentBounds = map?.getBounds();
  //   if (currentBounds) {
  //     setBounds(currentBounds);
  //   }
  // }, [map, setBounds]);

  // useEffect(() => {
  //   map?.on("dragend", updateBound);
  //   return () => {
  //     map?.off("dragend", updateBound);
  //   };
  // }, [map, updateBound]);

  // useEffect(() => {
  //   map?.on("zoomend", updateBound);
  //   return () => {
  //     map?.off("zoomend", updateBound);
  //   };
  // }, [map, updateBound]);

  const LeafIcon: any = L.Icon.extend({
    options: {},
  });

  const handleCreated = (map: L.Map) => {
    setMap(map);
    setBounds(map.getBounds());
  };

  const greenIcon = new LeafIcon({
    iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF",
  });

  const houseIcon = new LeafIcon({
    iconUrl: SmallIcon,
    iconSize: [75, 75],
  });

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={17}
      scrollWheelZoom={true}
      style={{ width: "100%", height: 500, zIndex: 1 }}
      whenCreated={handleCreated}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]} icon={houseIcon}>
        <Popup>{rentName}</Popup>
      </Marker>

      {filteredPoiList &&
        filteredPoiList.map((item, index) => (
          <Marker
            key={index}
            icon={greenIcon}
            riseOnHover
            ref={item.properties.f4 === poiId ? markerRef : null}
            position={[
              item.geometry.coordinates[0][1],
              item.geometry.coordinates[0][0],
            ]}
          >
            <Popup>
              {item.properties.f1}
              <br />
              {item.properties.f2}
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default LeafletMap;
