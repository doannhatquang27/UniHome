import { Grid } from "@material-ui/core";
import React from "react";
import { getIconTextFromCode } from "../../../../constants/facility-service-icons";
import IRentFacility from "../../../../interfaces/UniHouseApiInterfaces/IRentFacility";
import IRentService from "../../../../interfaces/UniHouseApiInterfaces/IRentService";
import "./index.scss";

interface Props {
  rentFacilities: IRentFacility[];
  rentServives: IRentService[];
}

const HouseFacitityAndService: React.FC<Props> = ({
  rentFacilities,
  rentServives,
}) => {
  // const myIconCode = "\f1ad";

  const renderRentFacitityItem = (item: IRentFacility) => {
    const iconCode = item.facility?.icon;
    const iconText = iconCode
      ? getIconTextFromCode(iconCode)
      : getIconTextFromCode("default");

    return (
      <Grid item xs={6} sm={4} md={3} key={item.facilityId}>
        <div className="item">
          <span className={`lab ${iconText}`} style={{ fontSize: 24 }}></span>
          <span className={`las ${iconText}`} style={{ fontSize: 24 }}></span>
          <span className="item_name content" style={{ marginLeft: "10px" }}>
            {item.facility?.name}
          </span>
        </div>
      </Grid>
    );
  };

  const renderRentFacilities = () => {
    return rentFacilities.map((item) => renderRentFacitityItem(item));
  };

  const renderRentServiceItem = (item: IRentService) => {
    const iconCode = item.service?.icon;
    const iconText = iconCode
      ? getIconTextFromCode(iconCode)
      : getIconTextFromCode("default");

    return (
      <Grid item xs={6} sm={4} md={3} key={item.serviceId}>
        <div className="item">
          <span className={`lab ${iconText}`} style={{ fontSize: 24 }}></span>
          <span className={`las ${iconText}`} style={{ fontSize: 24 }}></span>
          <span className="item_name content" style={{ marginLeft: "10px" }}>
            {item.service?.name}
          </span>
        </div>
      </Grid>
    );
  };

  const renderRentServices = () => {
    return rentServives.map((item) => renderRentServiceItem(item));
  };

  return (
    <div className="house-fac-and-ser">
      {rentFacilities.length > 0 && (
        <React.Fragment>
          <span className="title">Cơ sở vật chất:</span>
          <Grid container spacing={2}>
            {renderRentFacilities()}
          </Grid>
          <div className="spacing" />
        </React.Fragment>
      )}

      {rentServives.length > 0 && (
        <React.Fragment>
          <span className="title">Dịch vụ, tiện ích:</span>
          <Grid container spacing={2}>
            {renderRentServices()}
          </Grid>
          <div className="spacing" />
        </React.Fragment>
      )}
    </div>
  );
};

export default HouseFacitityAndService;
