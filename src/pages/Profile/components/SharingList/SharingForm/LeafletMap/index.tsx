import { useFormikContext } from "formik";
import L, { LatLng, LatLngExpression, LeafletMouseEvent } from "leaflet";
import React, { useCallback, useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

function LocationMarker() {
  const { setFieldValue } = useFormikContext();
  const [position, setPosition] = useState<LatLngExpression>([0, 0]);
  const map = useMapEvents({
    click(event: LeafletMouseEvent) {
      map.locate();
      setPosition(event.latlng);
      setFieldValue("coordinaryX", event.latlng.lat);
      setFieldValue("coordinaryY", event.latlng.lng);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Địa chỉ do bạn chọn</Popup>
    </Marker>
  );
}

const LeafletMap = () => {
  const { setFieldValue } = useFormikContext();
  const [position, setPosition] = useState<LatLngExpression>([0, 0]);
  const [map, setMap] = useState<L.Map | null>(null);

  const updateLatLngToCurrentLocation = useCallback(
    (position: GeolocationPosition) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      setPosition([lat, lng]);
      setFieldValue("coordinaryX", lat);
      setFieldValue("coordinaryY", lng);
      if (map) {
        map.setView(new LatLng(lat, lng));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [map]
  );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(updateLatLngToCurrentLocation);
    }
  }, [updateLatLngToCurrentLocation]);

  return (
    <div id="map">
      <MapContainer
        center={position}
        zoom={14}
        scrollWheelZoom={true}
        style={{ width: "100%", height: 300 }}
        id="leafletmap"
        whenCreated={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>Vị trí hiện tại của bạn</Popup>
        </Marker>
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
