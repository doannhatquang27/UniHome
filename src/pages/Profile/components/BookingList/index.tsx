import { Box, Grid, MenuItem, Select, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import CustomPagination from "../../../../components/utils/CustomPagination";
import { COLORS } from "../../../../constants/color";
import { AuthContext } from "../../../../contexts/AuthContext";
import IAppointment from "../../../../interfaces/UniHouseApiInterfaces/IAppointment";
import {
  getAcceptedAppointmentListOfOwnerAPI,
  getRejectedAppointmentListOfOwnerAPI,
  getWaitingAppointmentListOfOwnerAPI,
} from "../../../../services/appointment-services";
import BookingCard from "./BookingCard";

const PAGE_SIZE = 6;

export default function BookingList() {
  const { currentUser, accessToken } = useContext(AuthContext);
  const [bookingList, setBookingList] = useState<IAppointment[]>([]);
  const [status, setStatus] = useState<number>(0);
  const [fieldColor, setFieldColor] = useState<string>();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const fetchAcceptedAppointment = async (
    ownerId: string,
    accessToken: string
  ) => {
    const result = await getAcceptedAppointmentListOfOwnerAPI(
      ownerId,
      page,
      PAGE_SIZE,
      accessToken
    );
    if (result) {
      setBookingList(result.appointments);
      setTotalPage(result.totalRecord);
    } else {
      setBookingList([]);
      setTotalPage(1);
    }
  };

  const fetchRejectedAppointment = async (
    ownerId: string,
    accessToken: string
  ) => {
    const result = await getRejectedAppointmentListOfOwnerAPI(
      ownerId,
      page,
      PAGE_SIZE,
      accessToken
    );
    if (result) {
      setBookingList(result.appointments);
      setTotalPage(result.totalRecord);
    } else {
      setBookingList([]);
      setTotalPage(1);
    }
  };

  const fetchWaitingAppointment = async (
    ownerId: string,
    accessToken: string
  ) => {
    const result = await getWaitingAppointmentListOfOwnerAPI(
      ownerId,
      page,
      PAGE_SIZE,
      accessToken
    );
    if (result) {
      setBookingList(result.appointments);
      setTotalPage(result.totalRecord);
    } else {
      setBookingList([]);
      setTotalPage(1);
    }
  };

  const handleChangeStatus = (event: any) => {
    const { value } = event.target;
    setPage(1);
    setStatus(value);
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  useEffect(() => {
    if (currentUser && accessToken) {
      if (status === 0) {
        setFieldColor("rgb(255, 163, 50)");
        fetchWaitingAppointment(currentUser.userId, accessToken);
      } else if (status === 1) {
        setFieldColor("rgb(60, 192, 50)");
        fetchAcceptedAppointment(currentUser.userId, accessToken);
      } else {
        setFieldColor("#f44336");
        fetchRejectedAppointment(currentUser.userId, accessToken);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, currentUser, accessToken, page]);

  return (
    <Grid container spacing={2} style={{ paddingTop: 16 }}>
      <Grid item xs={12}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} lg={2}>
            <Typography variant="body1" display="inline">
              Trạng thái:
            </Typography>
          </Grid>
          <Grid item xs={12} lg={10}>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={status}
              onChange={handleChangeStatus}
              variant="outlined"
              style={{ color: fieldColor }}
            >
              <MenuItem value={0} style={{ color: "rgb(255, 163, 50)" }}>
                Đang chờ
              </MenuItem>
              <MenuItem value={1} style={{ color: "rgb(60, 192, 50)" }}>
                Đã xác nhận
              </MenuItem>
              <MenuItem value={2} style={{ color: "#f44336" }}>
                Đã hủy
              </MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Grid>

      {bookingList.length > 0 ? (
        <React.Fragment>
          <Grid container spacing={2}>
            {bookingList.map((item) => (
              <Grid item xs={12} lg={6} key={item.appointmentId}>
                <BookingCard
                  appointment={item}
                  bookingList={bookingList}
                  setBookingList={setBookingList}
                />
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12}>
            <CustomPagination
              page={page}
              handleChange={handleChangePage}
              totalPage={totalPage}
            />
          </Grid>
        </React.Fragment>
      ) : (
        <Box
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <Typography
            variant="body1"
            style={{
              textAlign: "center",
              fontSize: "30px",
              margin: "25%",
              color: COLORS.appMainColor,
            }}
          >
            Chưa có cuộc hẹn
          </Typography>
        </Box>
      )}
    </Grid>
  );
}
