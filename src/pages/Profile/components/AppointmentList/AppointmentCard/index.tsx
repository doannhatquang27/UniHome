import {
  Button,
  Card,
  CardContent,
  DialogProps,
  Grid,
  Typography,
} from "@material-ui/core";
import { format } from "date-fns";
import React, { useEffect } from "react";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import { BookingSlot } from "../../../../../enums/BookingSlot";
import IAppointment, {
  AppointmentStatusEnum,
} from "../../../../../interfaces/UniHouseApiInterfaces/IAppointment";
import IHouse from "../../../../../interfaces/UniHouseApiInterfaces/IHouse";
import { getHouseByIdAPI } from "../../../../../services/house-services";
import { getNavigationLinkToHouseDetail } from "../../../../../services/utils/navigation";
import AbsoluteCancelButton from "./AbsoluteCancelButton";
import CancelDialog from "./CancelDialog";

const AppointmentCard = ({
  appointment,
  appointmentList,
  setAppointmentList,
}: {
  appointment: IAppointment;
  appointmentList: IAppointment[];
  setAppointmentList: any;
}) => {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
  const [house, setHouse] = React.useState<IHouse>();

  const handleClickOpen = (scrollType: DialogProps["scroll"]) => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getRentEntityById = async () => {
      const house = await getHouseByIdAPI(appointment.houseId);
      setHouse(house);
    };
    getRentEntityById();
  }, [appointment.houseId]);

  const statusName = (status: number) => {
    switch (status) {
      case AppointmentStatusEnum.Rejected:
        return (
          <Typography
            variant="subtitle1"
            color="error"
            display="inline"
            gutterBottom
          >
            Hủy bỏ
          </Typography>
        );
      case AppointmentStatusEnum.Waiting:
        return (
          <Typography
            variant="subtitle1"
            style={{ color: "rgb(255, 163, 50)" }}
            display="inline"
            gutterBottom
          >
            Đang chờ xác nhận
          </Typography>
        );
      default:
        return (
          <Typography
            variant="subtitle1"
            style={{ color: "rgb(60, 192, 50)" }}
            display="inline"
            gutterBottom
          >
            Đã xác nhận
          </Typography>
        );
    }
  };

  return (
    <Card style={{ display: "block" }}>
      <CardContent style={{ flex: "1 0 auto" }}>
        <Grid container style={{ display: "block" }} spacing={2}>
          <Grid item xs={12} style={{ position: "relative" }}>
            {isMobile ? null : appointment.status !==
              AppointmentStatusEnum.Rejected ? (
              <AbsoluteCancelButton
                appointment={appointment}
                appointmentList={appointmentList}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                open={open}
                scroll={scroll}
                setAppointmentList={setAppointmentList}
              />
            ) : null}
            {house && (
              <Link
                key={appointment.houseId}
                to={getNavigationLinkToHouseDetail(house)}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Grid container spacing={1}>
                  <Grid item xs={12} lg={10}>
                    <Typography variant="subtitle1" display="block">
                      Ngày hẹn:{" "}
                      {format(
                        new Date(appointment.meetDate.split("T")[0]),
                        "dd-MM-yyyy"
                      )}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} lg={12}>
                    <Typography variant="subtitle1" display="block">
                      Thời gian:{" "}
                      {BookingSlot[appointment.meetTime].split(" ")[0]}
                      {appointment.meetTime < 24 ? "AM" : "PM"}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} lg={12}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      display="inline"
                      style={{ marginRight: "1%" }}
                    >
                      Trạng thái:
                    </Typography>
                    {statusName(appointment.status)}
                  </Grid>
                  <Grid item xs={12} lg={12}>
                    <Typography
                      variant="subtitle1"
                      display="block"
                      style={{ marginRight: "1%" }}
                    >
                      Địa chỉ: {appointment.address}
                    </Typography>
                  </Grid>
                </Grid>
              </Link>
            )}
          </Grid>

          {isMobile ? (
            appointment.status !== AppointmentStatusEnum.Rejected ? (
              <Grid xs={12}>
                <Button
                  aria-label="previous"
                  size="small"
                  style={{
                    backgroundColor: "rgb(255, 68, 72)",
                    color: "white",
                  }}
                  fullWidth
                  onClick={() => handleClickOpen("paper")}
                >
                  Hủy hẹn
                </Button>
                <CancelDialog
                  open={open}
                  handleClose={handleClose}
                  scroll={scroll}
                  appointmentId={appointment.appointmentId}
                  appointmentList={appointmentList}
                  setAppointmentList={setAppointmentList}
                ></CancelDialog>
              </Grid>
            ) : null
          ) : null}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;
