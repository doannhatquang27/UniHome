/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Grid, MenuItem, Select, Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import { COLORS } from "../../../../constants/color";
import { AuthContext } from "../../../../contexts/AuthContext";
import IAppointment from "../../../../interfaces/UniHouseApiInterfaces/IAppointment";
import {
  getAcceptedAppointmentListOfRenterAPI,
  getRejectedAppointmentListOfRenterAPI,
  getWaitingAppointmentListOfRenterAPI,
} from "../../../../services/appointment-services";
import AppointmentCard from "./AppointmentCard";

const PAGE_SIZE = 5;

export default function AppointmentList() {
  const { currentUser, accessToken } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const [appointmentList, setAppointmentList] = useState<IAppointment[]>([]);
  const [status, setStatus] = useState<number>(0);
  const [fieldColor, setFieldColor] = useState<string>();

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const displayErrorSnackbar = (message: string) => {
    if (!message.includes("Danh sách cuộc hẹn")) {
      enqueueSnackbar(message, {
        variant: "error",
        transitionDuration: { enter: 400, exit: 200 },
      });
    }
  };

  const fetchAcceptedAppointment = async (renterID: string) => {
    const result = await getAcceptedAppointmentListOfRenterAPI(
      renterID,
      accessToken
    );
    if (result) {
      if (typeof result !== "string") {
        setAppointmentList(result.appointments);
      } else {
        setAppointmentList([]);
        displayErrorSnackbar(result);
      }
    } else {
      displayErrorSnackbar("Có lỗi xảy ra");
    }
  };

  const fetchRejectedAppointment = async (renterID: string) => {
    const result = await getRejectedAppointmentListOfRenterAPI(
      renterID,
      accessToken
    );
    if (result) {
      if (typeof result !== "string") {
        setAppointmentList(result.appointments);
      } else {
        setAppointmentList([]);
        displayErrorSnackbar(result);
      }
    } else {
      displayErrorSnackbar("Có lỗi xảy ra");
    }
  };

  const fetchWaitingAppointment = async (renterID: string) => {
    const result = await getWaitingAppointmentListOfRenterAPI(
      renterID,
      accessToken
    );
    if (result) {
      if (typeof result !== "string") {
        setAppointmentList(result.appointments);
      } else {
        setAppointmentList([]);
        displayErrorSnackbar(result);
      }
    } else {
      displayErrorSnackbar("Có lỗi xảy ra");
    }
  };

  const handleChangeStatus = (event: any) => {
    const { value } = event.target;
    setStatus(value);
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  useEffect(() => {
    if (currentUser) {
      if (status === 0) {
        setFieldColor("rgb(255, 163, 50)");
        fetchWaitingAppointment(currentUser.userId);
      } else if (status === 1) {
        setFieldColor("rgb(60, 192, 50)");
        fetchAcceptedAppointment(currentUser.userId);
      } else {
        setFieldColor("#f44336");
        fetchRejectedAppointment(currentUser.userId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, currentUser]);

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

      {appointmentList.length > 0 ? (
        <Grid container spacing={2}>
          {appointmentList.map((item) => (
            <Grid item xs={12} lg={6} key={item.appointmentId}>
              <AppointmentCard
                appointment={item}
                appointmentList={appointmentList}
                setAppointmentList={setAppointmentList}
              />
            </Grid>
          ))}
        </Grid>
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
