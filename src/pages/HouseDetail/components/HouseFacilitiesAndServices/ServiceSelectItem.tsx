import { Grid, IconButton, makeStyles } from "@material-ui/core";
import { StarOutlineRounded } from "@material-ui/icons";
import React, { FC } from "react";
import IRentService from "../../../../interfaces/UniHouseApiInterfaces/IRentService";

interface Props {
  serviceInfo: IRentService;
}

const numberWithCommas = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ServiceSelectItem: FC<Props> = ({ serviceInfo }) => {
  const classes = useStyles();

  return (
    <Grid container alignItems="flex-start" style={{ marginTop: 16 }}>
      <Grid item xs={1}>
        <IconButton classes={{ root: classes.root }}>
          <StarOutlineRounded />
        </IconButton>
      </Grid>
      <Grid item xs={10}>
        <span>{serviceInfo.service?.name}</span>
        {serviceInfo.service?.price &&
          serviceInfo.service.unitName &&
          typeof serviceInfo.service.isFixed === "boolean" && (
            <React.Fragment>
              <br />
              <span>
                {numberWithCommas(serviceInfo.service?.price)}đ /{" "}
                {serviceInfo.service.unitName}
              </span>
              <br />
              {serviceInfo.service.isFixed && (
                <i>(Số lượng cố định mỗi tháng)</i>
              )}
            </React.Fragment>
          )}
      </Grid>
    </Grid>
  );
};

export default ServiceSelectItem;

const useStyles = makeStyles({
  root: {
    padding: 0,
  },
});
