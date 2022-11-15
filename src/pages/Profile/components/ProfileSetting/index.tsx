import DateFnsUtils from "@date-io/date-fns";
import {
  Box,
  Button,
  Grid,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { Form, Formik } from "formik";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect } from "react";
import { isMobile } from "react-device-detect";
import * as Yup from "yup";
import { COLORS } from "../../../../constants/color";
import { CALENDAR_THEME } from "../../../../constants/theme";
import { AuthContext } from "../../../../contexts/AuthContext";
import IUser from "../../../../interfaces/UniHouseApiInterfaces/IUser";
import { getAllUniversitiesAPI } from "../../../../services/university-services";
import { updateProfile } from "../../../../services/user-services";
import CustomButton from "./Button";
import GenderSelect from "./GenderSelect";
import "./index.scss";
import Textfield from "./TextField";
import University from "./University";

const VALIDATE_SCHEMA = Yup.object().shape({
  name: Yup.string().required("Vui lòng điền họ tên"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng điền email"),
  phone: Yup.string()
    .required("Vui lòng nhập số điện thoại")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Số điện thoại không hợp lệ"
    )
    .min(10, "Số điện thoại phải có 10 chữ số")
    .max(10, "Số điện thoại không được quá 10 chữ số"),
});
export interface OptionProps {
  value: string;
  label: string;
}

export default function ProfileSetting() {
  const { currentUser, accessToken, updateCurrentUserContext } =
    useContext(AuthContext);
  const [dateOfBirth, setDateOfBirth] = React.useState<Date | null>(
    new Date(currentUser?.dateOfBirth!)
  );
  const [citizenNumberDate, setCitizenNumberDate] = React.useState<Date | null>(
    new Date(currentUser?.citizenNumberDate!)
  );
  const [universityList, setUniversityList] = React.useState<OptionProps[]>([]);
  const [isUpdate, setIsUpdate] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // const options = {
  //   labels: {
  //     confirmable: "Xác nhận",
  //     cancellable: "Hủy bỏ",
  //   },
  // };

  const INITIAL_FORM_STATE = {
    name: currentUser ? currentUser.fullname : "",
    gender: currentUser ? currentUser.gender : 0,
    email: currentUser ? currentUser.email : "",
    phone: currentUser ? currentUser.phone : "",
    university: currentUser
      ? currentUser.universityId
        ? currentUser.universityId
        : "No"
      : "",
    citizenNumber: currentUser ? currentUser.citizenNumber : "",
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

  const onCancel = () => {
    setIsUpdate(false);
    setDateOfBirth(new Date(currentUser?.dateOfBirth!));
  };

  const onSave = async (values: any) => {
    setIsUpdate(!isUpdate);
    const updatedUser: IUser = {
      userId: currentUser?.userId!,
      fullname: values.name,
      phone: values.phone!,
      dateOfBirth: formatDate(dateOfBirth!),
      email: values.email!,
      image: currentUser?.image!,
      role: currentUser?.role!,
      roleId: currentUser?.roleId!,
      roleName: currentUser?.roleName!,
      status: currentUser?.status!,
      universityId: values.university === "No" ? null : values.university,
      address: currentUser?.address!,
      citizenNumber: currentUser?.citizenNumber!,
      citizenNumberDate: currentUser?.citizenNumberDate!,
      gender: values.gender,
      lastModified: currentUser?.lastModified!,
      modifiedBy: currentUser?.modifiedBy!,
      statusString: currentUser?.statusString!,
    };
    if (accessToken) {
      const result = await updateProfile(updatedUser, accessToken);
      if (result === true) {
        enqueueSnackbar("Cập nhật thông tin thành công", {
          variant: "success",
          transitionDuration: { enter: 400, exit: 200 },
        });
        updateCurrentUserContext(updatedUser);
      } else {
        enqueueSnackbar("Cập nhật thông tin thất bại", {
          variant: "error",
          transitionDuration: { enter: 400, exit: 200 },
        });
      }
    } else {
      enqueueSnackbar("Cập nhật thông tin thất bại", {
        variant: "error",
        transitionDuration: { enter: 400, exit: 200 },
      });
    }
  };

  useEffect(() => {
    const fetchUniversityList = async () => {
      const result = await getAllUniversitiesAPI();
      if (result) {
        let list = [];
        list.push({
          value: "No",
          label: "Không thuộc trường đại học / cao đẳng",
        });
        result.forEach((item) => {
          list.push({
            value: item.universityId,
            label: item.name,
          });
        });
        setUniversityList(list);
      }
    };
    fetchUniversityList();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography
          variant="h5"
          display="block"
          gutterBottom
          style={{ color: COLORS.appMainColor }}
        >
          Thông tin cá nhân
        </Typography>
        <hr />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="text"
          style={{
            backgroundColor: COLORS.appMainColor,
            color: "white",
            float: "right",
            visibility: !isUpdate ? "visible" : "hidden",
          }}
          onClick={() => setIsUpdate(!isUpdate)}
        >
          Cập nhật
        </Button>
      </Grid>
      <Box>
        <Formik
          initialValues={INITIAL_FORM_STATE}
          validationSchema={VALIDATE_SCHEMA}
          onSubmit={(values) => {
            onSave(values);
          }}
        >
          <Form>
            <Grid
              container
              spacing={2}
              style={{ paddingLeft: "10px", paddingRight: "10px" }}
            >
              <Grid item xs={10}>
                <Typography
                  variant="overline"
                  display="block"
                  gutterBottom
                  className="title"
                >
                  Họ và tên
                </Typography>
                <Textfield name="name" disabled={!isUpdate} />
              </Grid>
              <Grid item xs={2}>
                <Typography
                  variant="overline"
                  display="block"
                  gutterBottom
                  className="title"
                >
                  Giới tính
                </Typography>
                {/* <Textfield name="gender" disabled={!isUpdate} /> */}
                <GenderSelect name="gender" disabled={!isUpdate} />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography
                  variant="overline"
                  display="block"
                  gutterBottom
                  className="title"
                >
                  Số điện thoại
                </Typography>
                <Textfield name="phone" disabled={!isUpdate} />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography
                  variant="overline"
                  display="block"
                  gutterBottom
                  className="title"
                >
                  Ngày sinh
                </Typography>
                <ThemeProvider theme={CALENDAR_THEME}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      variant="inline"
                      format="dd/MM/yyyy"
                      orientation="landscape"
                      margin="none"
                      id="date-picker-inline"
                      value={dateOfBirth}
                      onChange={setDateOfBirth}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      fullWidth
                      disableFuture
                      autoOk
                      inputVariant="outlined"
                      disabled
                    />
                  </MuiPickersUtilsProvider>
                </ThemeProvider>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography
                  variant="overline"
                  display="block"
                  gutterBottom
                  className="title"
                >
                  CMND / CCCD
                </Typography>
                <Textfield name="citizenNumber" disabled={true} />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography
                  variant="overline"
                  display="block"
                  gutterBottom
                  className="title"
                >
                  Ngày cấp
                </Typography>
                <ThemeProvider theme={CALENDAR_THEME}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      variant="inline"
                      format="dd/MM/yyyy"
                      orientation="landscape"
                      margin="none"
                      id="date-picker-inline"
                      value={citizenNumberDate}
                      onChange={setCitizenNumberDate}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      fullWidth
                      disableFuture
                      autoOk
                      inputVariant="outlined"
                      disabled
                    />
                  </MuiPickersUtilsProvider>
                </ThemeProvider>
              </Grid>
              <Grid item xs={12} lg={12}>
                <Typography
                  variant="overline"
                  display="block"
                  gutterBottom
                  className="title"
                >
                  Thuộc trường đại học / cao đẳng
                </Typography>
                <University
                  name="university"
                  options={universityList}
                  disabled={!isUpdate}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <Typography
                  variant="overline"
                  display="block"
                  gutterBottom
                  className="title"
                >
                  Email
                </Typography>
                <Textfield name="email" disabled />
              </Grid>

              {isUpdate ? (
                <Grid item xs={12} style={{ marginTop: 8 }}>
                  <CustomButton
                    style={{
                      float: "right",
                      backgroundColor: COLORS.appMainColor,
                      color: "white",
                    }}
                    isSubmit={true}
                  >
                    Lưu
                  </CustomButton>
                  <CustomButton
                    style={{
                      float: "right",
                      marginRight: isMobile ? "2%" : "1%",
                      color: COLORS.appMainColor,
                    }}
                    isSubmit={false}
                    values={INITIAL_FORM_STATE}
                    onCancel={onCancel}
                  >
                    Hủy bỏ
                  </CustomButton>
                </Grid>
              ) : null}
            </Grid>
          </Form>
        </Formik>
      </Box>
    </Grid>
  );
}
