import { Grid, Tab, Tabs, ThemeProvider, Typography } from "@material-ui/core";
import React from "react";
import { COLORS } from "../../../../constants/color";
import { APPOINTMENT_TAB_THEME } from "../../../../constants/theme";
import AppointmentList from "../AppointmentList";
import BookingList from "../BookingList";
import ApppointmentTabPanel from "./AppointmentTabPanel";

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export enum AppointmentEnum {
  "AppointmentList",
  "BookingList",
}

const Appointment = () => {
  const [value, setValue] = React.useState(AppointmentEnum.AppointmentList);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography
          variant="h5"
          display="block"
          gutterBottom
          style={{ color: COLORS.appMainColor }}
        >
          Lịch hẹn
        </Typography>
        <hr />
      </Grid>
      <Grid item xs={12}>
        <AppointmentList />
      </Grid>
    </Grid>
  );
};

export default Appointment;
