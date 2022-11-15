import { Grid } from "@material-ui/core";
import React from "react";
import { getIconTextFromCode } from "../../../../constants/facility-service-icons";
import IFacility from "../../../../interfaces/UniHouseApiInterfaces/IFacility";
import "./index.scss";

interface Props {
  facilityList: IFacility[];
}

const FacilityListForHouse: React.FC<Props> = ({ facilityList }) => {
  const renderRentFacitityItem = (item: IFacility) => {
    const iconCode = item.icon;
    const iconText = iconCode
      ? getIconTextFromCode(iconCode)
      : getIconTextFromCode("default");

    return (
      <Grid item xs={6} sm={4} md={3} key={item.facilityId}>
        <div className="item">
          <span className={`lab ${iconText}`} style={{ fontSize: 24 }}></span>
          <span className={`las ${iconText}`} style={{ fontSize: 24 }}></span>
          <span className="item_name content" style={{ marginLeft: "10px" }}>
            {item.name}
          </span>
        </div>
      </Grid>
    );
  };

  const renderRentFacilities = () => {
    return facilityList.map((item) => renderRentFacitityItem(item));
  };

  // const renderRentServiceItem = (item: IRentService) => {
  //   const iconCode = item.service?.icon;
  //   const iconText = iconCode
  //     ? getIconTextFromCode(iconCode)
  //     : getIconTextFromCode("default");

  //   return (
  //     <Grid item xs={6} sm={4} md={3} key={item.serviceId}>
  //       <div className="item">
  //         <span className={`lab ${iconText}`} style={{ fontSize: 24 }}></span>
  //         <span className={`las ${iconText}`} style={{ fontSize: 24 }}></span>
  //         <span className="item_name content" style={{ marginLeft: "10px" }}>
  //           {item.service?.name}
  //         </span>
  //       </div>
  //     </Grid>
  //   );
  // };

  // const renderRentServices = () => {
  //   return rentServives.map((item) => renderRentServiceItem(item));
  // };

  return (
    <div className="house-fac-and-ser">
      <span className="title">Cơ sở vật chất</span>
      {facilityList.length > 0 && (
        <React.Fragment>
          <Grid container spacing={2}>
            {renderRentFacilities()}
          </Grid>
          {/* <div className="spacing" /> */}
        </React.Fragment>
      )}

      {/* {rentServives.length > 0 && (
        <React.Fragment>
          <span className="title">Dịch vụ, tiện ích:</span>
          <Grid container spacing={2}>
            {renderRentServices()}
          </Grid>
          <div className="spacing" />
        </React.Fragment>
      )} */}
    </div>
  );
};

export default FacilityListForHouse;
