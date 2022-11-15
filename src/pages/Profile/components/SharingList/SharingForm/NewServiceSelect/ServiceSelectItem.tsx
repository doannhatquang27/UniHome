import { Grid, IconButton } from "@material-ui/core";
import {
  StarOutlineRounded,
  StarRounded,
  UpdateOutlined,
} from "@material-ui/icons";
import React, { FC } from "react";
import { PriceUnit, ServiceSelectInfo } from "./index";

interface Props {
  serviceInfo: ServiceSelectInfo;
  toggleUpdateModel: (service: ServiceSelectInfo) => void;
  toggleSelect: (service: ServiceSelectInfo) => void;
}

const numberWithCommas = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const convertUnitToVietnamese = (unit: PriceUnit) => {
  let result = "";
  switch (unit) {
    case PriceUnit.CubicMetre:
      result = "mét khối";
      break;
    case PriceUnit.KilowattHour:
      result = "kwh";
      break;
    case PriceUnit.Month:
      result = "tháng";
      break;
    case PriceUnit.Person:
      result = "người";
      break;
    default:
      result = "Chưa xác định";
  }
  return result;
};

const ServiceSelectItem: FC<Props> = ({
  serviceInfo,
  toggleUpdateModel,
  toggleSelect,
}) => {
  return (
    <Grid container alignItems="center" style={{ marginTop: 16 }}>
      <Grid item xs={1}>
        {serviceInfo.selected ? (
          <IconButton onClick={() => toggleSelect(serviceInfo)}>
            <StarRounded />
          </IconButton>
        ) : (
          <IconButton onClick={() => toggleSelect(serviceInfo)}>
            <StarOutlineRounded />
          </IconButton>
        )}
      </Grid>
      <Grid item xs={10}>
        <span>{serviceInfo.serviceName}</span>
        {serviceInfo.price &&
          serviceInfo.unit &&
          typeof serviceInfo.isConsistent === "boolean" && (
            <React.Fragment>
              <br />
              <span>
                {numberWithCommas(serviceInfo.price)}đ /{" "}
                {convertUnitToVietnamese(serviceInfo.unit)}
              </span>
              <br />
              {serviceInfo.isConsistent && <i>(Số lượng cố định mỗi tháng)</i>}
            </React.Fragment>
          )}
      </Grid>
      <Grid item xs={1}>
        <IconButton onClick={() => toggleUpdateModel(serviceInfo)}>
          <UpdateOutlined />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default ServiceSelectItem;
