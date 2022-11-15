import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  ButtonGroup,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import { COLORS } from "../../../../constants/color";
import { AuthContext } from "../../../../contexts/AuthContext";
import CreateAppointmentDto from "../../../../dtos/appointmentDtos/CreateAppointmentDto";
import { BookingSlot } from "../../../../enums/BookingSlot";
import IAppointment from "../../../../interfaces/UniHouseApiInterfaces/IAppointment";
import IBookSlot from "../../../../interfaces/UniHouseApiInterfaces/IBookingSlot";
import {
  createAppointmentAPI,
  getAcceptedAppointmentListOfRenterAPI,
  getRejectedAppointmentListOfRenterAPI,
  getWaitingAppointmentListOfRenterAPI,
} from "../../../../services/appointment-services";
import "./index.scss";

interface Props {
  houseId: string;
  bookingSlot: IBookSlot[];
}

interface IBookingSlot {
  index: number;
  slotTime: string;
}

const PhoneRegExp =
  /((0[3|5|7|8|9])+([0-9]{8}$))|(\+84[3|5|7|8|9]+([0-9]{8}$))\b/g;

const validate = (values: any) => {
  const errors: { [k: string]: any } = {};
  if (!values.name) {
    errors.name = "Không được để trống";
  }

  if (!values.email) {
    errors.email = "Không được để trống";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Không đúng format của email";
  }

  if (!values.phone) {
    errors.phone = "Vui lòng nhập số điện thoại";
  } else if (values.phone.length < 10) {
    errors.phone = "Số điện thoại phải có 10 chữ số";
  } else if (values.phone.length > 12) {
    errors.phone = "Số điện thoại không được quá 12 chữ số";
  } else if (PhoneRegExp.test(values.phone) === false) {
    errors.phone = "Số điện thoại không hợp lệ";
  }

  return errors;
};

const BookingForm: React.FC<Props> = ({ houseId, bookingSlot }) => {
  const { currentUser, accessToken } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );
  const [showBookingSlot, setShowBookingSlot] = useState(true);
  const [availableSlot, setAvailableSlot] = useState<number[]>([]);
  const [chosenSlot, setChosenSlot] = useState<number | null>(null);
  const [isAM, setIsAM] = useState(true);
  const [bookingSlotError, setBookingSlotError] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let tempAvailableSlots = [] as number[];
    bookingSlot.forEach((slot) => {
      for (let i = slot.startTime; i < slot.endTime; i++) {
        tempAvailableSlots.push(i);
      }
    });
    setAvailableSlot(tempAvailableSlots);
  }, [bookingSlot]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const length = 48;
  let bookingSlotList = [] as IBookingSlot[];

  for (let i = 0; i < length; i++) {
    bookingSlotList.push({ index: i, slotTime: BookingSlot[i] });
  }

  const handleBookingSlotChange = (slot: number) => {
    setChosenSlot(slot);
    setBookingSlotError("");
  };

  const findSlotIdFromSlot = () => {
    let result = "";
    if (bookingSlot.length > 0 && chosenSlot) {
      for (let index = 0; index < bookingSlot.length; index++) {
        const item = bookingSlot[index];
        if (chosenSlot >= item.startTime && chosenSlot < item.endTime) {
          result = item.slotId;
          break;
        }
      }
    }
    return result;
  };

  const createAppointment = async (data: CreateAppointmentDto) => {
    setError("");
    setBookingSlotError("");
    const result = await createAppointmentAPI(data);
    if (typeof result === "boolean" && result === true) {
      formik.resetForm();
      enqueueSnackbar("Tạo lịch hẹn thành công", {
        variant: "success",
        transitionDuration: { enter: 400, exit: 200 },
      });
    }
    if (typeof result === "string") {
      setError(result);
    }
  };

  const formatDate = (dateValue: Date | null) => {
    const date = dateValue ? dateValue : new Date();
    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();

    let result = yyyy + "";
    result += mm < 10 ? `-0${mm}` : `-${mm}`;
    result += dd < 10 ? `-0${dd}` : `-${dd}`;
    return result;
  };

  const isDateEqual = (appointmentDate: string) => {
    if (selectedDate) {
      const dateOnly = appointmentDate.substring(0, 10); // lấy ra YYYY-mm-DD
      const selectedDateOnly = formatDate(selectedDate); // convert thành YYYY-mm-DD
      return dateOnly === selectedDateOnly;
    }
    return false;
  };

  // danh sách tất cả cuộc hẹn của renter
  const getAppointmentList = async () => {
    const appointmentList: IAppointment[] = [];
    if (currentUser) {
      const waitingList = await getWaitingAppointmentListOfRenterAPI(
        currentUser.userId,
        accessToken
      );
      const acceptedList = await getAcceptedAppointmentListOfRenterAPI(
        currentUser.userId,
        accessToken
      );
      const rejectedList = await getRejectedAppointmentListOfRenterAPI(
        currentUser.userId,
        accessToken
      );

      if (waitingList && typeof waitingList !== "string") {
        appointmentList.push(...waitingList.appointments);
      }

      if (acceptedList && typeof acceptedList !== "string") {
        appointmentList.push(...acceptedList.appointments);
      }

      if (rejectedList && typeof rejectedList !== "string") {
        appointmentList.push(...rejectedList.appointments);
      }
    }
    return appointmentList;
  };

  // kiểm tra xem có cuộc hẹn nào trùng hay không
  const isDuplicateAppointment = async () => {
    if (currentUser) {
      const appointmentList = await getAppointmentList();
      if (appointmentList) {
        for (let index = 0; index < appointmentList.length; index++) {
          const item = appointmentList[index];
          if (
            item.houseId === houseId &&
            item.meetTime === chosenSlot &&
            isDateEqual(item.meetDate)
          ) {
            return true;
          }
        }
      }
      return false;
    }
  };

  const handleFormSubmit = async (values: any) => {
    const isDuplicated = await isDuplicateAppointment();
    if (chosenSlot && !isDuplicated) {
      const data: CreateAppointmentDto = {
        houseId,
        rentTypeId: "",
        renterName: values.name,
        renterPhone: values.phone,
        renterEmail: values.email,
        note: "",
        renterId: currentUser ? currentUser.userId : null,
        meetTime: chosenSlot,
        meetDate: formatDate(selectedDate),
        slotId: findSlotIdFromSlot(),
      };
      await createAppointment(data);
    } else if (isDuplicated) {
      setBookingSlotError("Lịch hẹn bị trùng");
    } else {
      setBookingSlotError("Chọn một slot");
    }
  };

  const formik = useFormik({
    initialValues: {
      name: currentUser ? currentUser.fullname : "",
      email: currentUser ? currentUser.email : "",
      phone: currentUser ? currentUser.phone : "",
    },
    validate,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <Typography
        variant="h5"
        component="p"
        className="title"
        style={{ color: COLORS.appMainColor }}
      >
        Tạo lịch hẹn
      </Typography>
      <div>
        <TextField
          value={formik.values.name}
          onChange={formik.handleChange}
          autoComplete="off"
          id="name"
          name="name"
          label="Họ và tên"
          variant="outlined"
          size="small"
          fullWidth
          className="name-field"
        />
        {formik.errors.name ? (
          <div className="error">{formik.errors.name}</div>
        ) : null}
      </div>
      <div>
        <TextField
          value={formik.values.email}
          onChange={formik.handleChange}
          autoComplete="off"
          id="email"
          name="email"
          type="email"
          label="Email"
          variant="outlined"
          size="small"
          fullWidth
          className="email-field"
        />
        {formik.errors.email ? (
          <div className="error">{formik.errors.email}</div>
        ) : null}
      </div>
      <div>
        <TextField
          value={formik.values.phone}
          onChange={formik.handleChange}
          autoComplete="off"
          id="phone"
          name="phone"
          label="Số điện thoại liên hệ"
          type="tel"
          variant="outlined"
          size="small"
          fullWidth
          className="phone-field"
        />
        {formik.errors.phone ? (
          <div className="error">{formik.errors.phone}</div>
        ) : null}
      </div>
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="none"
            id="date-picker-inline"
            label="Chọn ngày"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            fullWidth
            disablePast
            autoOk
            inputVariant="outlined"
            className="date-picker"
            size="small"
          />
        </MuiPickersUtilsProvider>
      </div>

      <div className="booking-slot">
        <div className="booking-slot__confirm">
          <TextField
            id="booking-slot"
            variant="outlined"
            size="small"
            className="booking-slot__confirm__field"
            value={
              chosenSlot
                ? BookingSlot[chosenSlot].split(" ")[0]
                : "Thời gian hẹn"
            }
            InputProps={{
              readOnly: true,
            }}
          />
          {/* <Button
            className="booking-slot__confirm__button"
            variant="contained"
            onClick={() => setShowBookingSlot(!showBookingSlot)}
          >
            Đổi Slot
          </Button> */}
        </div>
        {bookingSlotError ? (
          <div className="error">{bookingSlotError}</div>
        ) : null}

        {showBookingSlot ? (
          <React.Fragment>
            <ButtonGroup
              aria-label="outlined primary button group"
              className="booking-slot__button-group"
            >
              <Button
                disabled={isAM}
                onClick={() => setIsAM(true)}
                className={isAM ? "booking-slot__button-group--morning" : ""}
                color="secondary"
              >
                <span className="las la-sun" />
                &nbsp;&nbsp;Sáng
              </Button>
              <Button
                disabled={!isAM}
                onClick={() => setIsAM(false)}
                className={!isAM ? "booking-slot__button-group--afternoon" : ""}
                color="primary"
              >
                <span className="las la-cloud-sun" />
                &nbsp;&nbsp;Chiều
              </Button>
            </ButtonGroup>
            <Grid container>
              {bookingSlotList
                .filter((slot, index) => (isAM ? index < 24 : index > 23))
                .filter((slot) => availableSlot.includes(slot.index))
                .map((slot) => (
                  <Grid
                    key={slot.index}
                    item
                    xs={3}
                    lg={4}
                    className="booking-slot__grid"
                  >
                    <Button
                      fullWidth
                      variant="outlined"
                      color="primary"
                      className="booking-slot__slot-button"
                      // disabled={!availableSlot.includes(slot.index)}
                      onClick={() => handleBookingSlotChange(slot.index)}
                    >
                      {slot.slotTime.split(" ")[0]}
                    </Button>
                  </Grid>
                ))}

              {availableSlot.length === 0 && (
                <div
                  style={{
                    width: "100%",
                    borderRadius: 5,
                    marginTop: 12,
                    padding: 12,
                    backgroundColor: "bisque",
                  }}
                >
                  <span style={{ color: "brown" }}>
                    Chủ trọ không còn slot trống
                  </span>
                </div>
              )}
            </Grid>
          </React.Fragment>
        ) : null}
      </div>
      <div>
        <Button
          fullWidth
          variant="contained"
          type="submit"
          className="submit-button"
        >
          Đặt hẹn
        </Button>
        {error ? <span style={{ color: "red" }}>{error}</span> : null}
      </div>
    </form>
  );
};

export default BookingForm;
