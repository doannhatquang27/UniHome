import {
  Button,
  Card,
  CardActions,
  CardContent,
  DialogProps,
  Grid,
  Typography,
} from "@material-ui/core";
import { format } from "date-fns";
import React, { useEffect } from "react";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import { COLORS } from "../../../../../constants/color";
import { BookingSlot } from "../../../../../enums/BookingSlot";
import IAppointment, {
  AppointmentStatusEnum,
} from "../../../../../interfaces/UniHouseApiInterfaces/IAppointment";
import IHouse from "../../../../../interfaces/UniHouseApiInterfaces/IHouse";
import { getHouseByIdAPI } from "../../../../../services/house-services";
import { getNavigationLinkToHouseDetail } from "../../../../../services/utils/navigation";
import CancelDialog from "./CancelDialog";
import "./index.scss";

const BookingCard = ({
  appointment,
  bookingList,
  setBookingList,
}: {
  appointment: IAppointment;
  bookingList: IAppointment[];
  setBookingList: any;
}) => {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
  const [house, setHouse] = React.useState<IHouse>();

  const handleClickOpen = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    scrollType: DialogProps["scroll"]
  ) => {
    event.stopPropagation();
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
    <Card className="booking-card_card">
      <CardContent className="booking-card_card_content">
        <Grid container className="booking-card_card_content_grid" spacing={2}>
          <Grid item xs={12}>
            {house ? (
              <Link
                key={appointment.houseId}
                to={getNavigationLinkToHouseDetail(house)}
                className="booking-card_card_content_grid_link"
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
                      className="booking-card_card_content_grid_typo"
                    >
                      Trạng thái:
                    </Typography>
                    {statusName(appointment.status)}
                  </Grid>
                  <Grid item xs={12} lg={12}>
                    <Typography
                      variant="subtitle1"
                      display="block"
                      className="booking-card_card_content_grid_typo"
                    >
                      Lý do: {appointment.abortReason}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} lg={12}>
                    <Typography
                      variant="subtitle1"
                      display="block"
                      className="booking-card_card_content_grid_typo"
                    >
                      Địa chỉ: {appointment.address}
                    </Typography>
                  </Grid>
                </Grid>
              </Link>
            ) : null}
          </Grid>
          {isMobile && appointment.status !== AppointmentStatusEnum.Rejected ? (
            <Grid xs={12}>
              <Button
                aria-label="previous"
                size="small"
                style={{
                  backgroundColor: "rgb(255, 68, 72)",
                  color: "white",
                }}
                fullWidth
                onClick={(event) => handleClickOpen(event, "paper")}
              >
                Hủy hẹn
              </Button>
              <CancelDialog
                open={open}
                handleClose={handleClose}
                scroll={scroll}
                appointmentId={appointment.appointmentId}
                bookingList={bookingList}
                setBookingList={setBookingList}
              ></CancelDialog>
            </Grid>
          ) : null}
        </Grid>
      </CardContent>
      {!isMobile && (
        <CardActions>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                fullWidth
                style={{ backgroundColor: COLORS.appMainColor, color: "white" }}
              >
                Chấp nhận
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                fullWidth
                color="secondary"
                onClick={(event) => handleClickOpen(event, "paper")}
              >
                Từ chối
              </Button>
            </Grid>
          </Grid>

          <CancelDialog
            open={open}
            handleClose={handleClose}
            scroll={scroll}
            appointmentId={appointment.appointmentId}
            bookingList={bookingList}
            setBookingList={setBookingList}
          ></CancelDialog>
        </CardActions>
      )}
    </Card>
  );
};

export default BookingCard;
