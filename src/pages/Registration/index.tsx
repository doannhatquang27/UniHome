/* eslint-disable @typescript-eslint/no-unused-vars */
import DateFnsUtils from "@date-io/date-fns";
import {
  Avatar,
  Badge,
  Card,
  Checkbox,
  CheckboxProps,
  createStyles,
  FormControl,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Theme,
  ThemeProvider,
  Typography,
  withStyles,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { MuiPickersOverrides } from "@material-ui/pickers/typings/overrides";
import firebase from "firebase/app";
import "firebase/storage"; // for storage
import { Form, Formik } from "formik";
import { useSnackbar } from "notistack";
import React, { createRef, useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { COLORS } from "../../constants/color";
import { CALENDAR_THEME } from "../../constants/theme";
import { AuthContext } from "../../contexts/AuthContext";
import { getAllUniversitiesAPI } from "../../services/university-services";
import { registerUser } from "../../services/user-services";
import CustomButton from "./Button";
import "./index.scss";
import OtpModal from "./OtpModal";
import Textfield from "./TextField";
import University from "./University";

type overridesNameToClassKey = {
  [P in keyof MuiPickersOverrides]: keyof MuiPickersOverrides[P];
};

declare module "@material-ui/core/styles/overrides" {
  export interface ComponentNameToClassKey extends overridesNameToClassKey {}
}

const PhoneRegExp =
  /((0[3|5|7|8|9])+([0-9]{8}$))|(\+84[3|5|7|8|9]+([0-9]{8}$))\b/g;

const VALIDATE_SCHEMA = Yup.object().shape({
  fullname: Yup.string().required("Vui lòng điền họ tên"),
  phone: Yup.string()
    .required("Vui lòng nhập số điện thoại")
    .matches(PhoneRegExp, "Số điện thoại không hợp lệ")
    .min(10, "Số điện thoại phải có 10 chữ số")
    .max(12, "Số điện thoại không được quá 12 chữ số"),
  // university: Yup.string().required("Vui lòng chọn một"),
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
  })
);

interface IState {
  accessToken: string;
  email: string;
  googleId: string;
  name: string;
}

export interface OptionProps {
  value: string;
  label: string;
}

const Registration = () => {
  const fileRef = createRef<HTMLInputElement>();
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const state = location.state as IState;

  const { login } = React.useContext(AuthContext);
  const [transferred, setTransferred] = React.useState(0);
  const [name, setName] = React.useState(state.name);
  const [accessToken, setAccessToken] = React.useState<string>(
    state.accessToken
  );
  const [googleId, setGoogleId] = React.useState<string>(state.googleId);
  const [dateOfBirth, setDateOfBirth] = React.useState<Date | null>(new Date());
  const [dobValid, setDobValid] = React.useState(true);
  const [email, setEmail] = React.useState<string>(state.email);
  const [image, setImage] = React.useState<File>();
  const [imageSrc, setImageSrc] = React.useState<string>();
  const [universityList, setUniversityList] = React.useState<OptionProps[]>([]);
  const [check, setChecked] = React.useState({
    checked: false,
  });
  const [modalVisible, setModalVisible] = React.useState(false);
  const [inputPhone, setInputPhone] = React.useState("");
  const [isStartRegistration, setStartRegistration] = useState(false);
  const [currentValues, setCurrentValues] = useState<any>();

  const { enqueueSnackbar } = useSnackbar();

  const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      "&$checked": {
        color: green[600],
      },
    },
    checked: {},
  })((props: CheckboxProps) => <Checkbox color="default" {...props} />);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked({ ...check, [event.target.name]: event.target.checked });
  };

  const uploadImage = async (image: any) => {
    let uploadedUrl = "";
    const uploadTask = firebase
      .storage()
      .ref(`images/rent/${image.name}`)
      .put(image);

    uploadTask.on(
      "state_changed",
      (snapshot: any) => {
        setTransferred(
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        );
      },
      (error: any) => console.error(error)
    );

    await uploadTask.then(async () => {
      const mDownloadUrl = await firebase
        .storage()
        .ref("images/rent/")
        .child(image.name)
        .getDownloadURL();
      uploadedUrl = mDownloadUrl;
    });

    try {
      await uploadTask;
    } catch (error) {
      console.error(error);
    }

    return uploadedUrl;
  };

  const onUploadImage = async (image: any) => {
    const uploadedUrl = await uploadImage(image);
    setTransferred(0);
    return uploadedUrl;
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

  const checkAgeIsValid = (date: Date) => {
    const currentDate = new Date();
    const yearBetween = currentDate.getFullYear() - date.getFullYear();
    return yearBetween >= 18 && yearBetween <= 25;
  };

  const handleChangeDate = (dateValue: Date | null) => {
    if (dateValue) {
      setDateOfBirth(dateValue);
      setDobValid(checkAgeIsValid(dateValue));
    }
  };

  useEffect(() => {
    if (inputPhone !== "") {
      setModalVisible(true);
    }
  }, [inputPhone]);

  useEffect(() => {
    if (isStartRegistration === true) {
      onRegister(currentValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStartRegistration]);

  const handleRegistration = (values: any) => {
    if (!dateOfBirth || (dateOfBirth && !checkAgeIsValid(dateOfBirth))) {
      setDobValid(false);
      return;
    }
    if (!dobValid) return;

    setCurrentValues(values);
    setInputPhone(values.phone);
  };

  const onRegister = async (values: any) => {
    let url = "";
    if (image != null) {
      url = await onUploadImage(image);
    }

    const result = await registerUser(
      accessToken,
      values.fullname,
      values.phone,
      formatDate(dateOfBirth),
      url,
      email,
      values.university === "No" || values.university === ""
        ? null
        : values.university
    );

    if (result) {
      if (typeof result === "number" && result === 200) {
        enqueueSnackbar("Đăng kí thành công", {
          variant: "success",
          transitionDuration: { enter: 400, exit: 200 },
        });
        const resultLogin = await login(accessToken, googleId);
        if (resultLogin) {
          history.push({ pathname: "/profile" });
        }
      } else {
        if (typeof result === "string") {
          enqueueSnackbar(result, {
            variant: "error",
            transitionDuration: { enter: 400, exit: 200 },
          });
        } else {
          enqueueSnackbar("Đăng kí không thành công", {
            variant: "error",
            transitionDuration: { enter: 400, exit: 200 },
          });
        }
      }
    } else {
      enqueueSnackbar("Đăng kí không thành công", {
        variant: "error",
        transitionDuration: { enter: 400, exit: 200 },
      });
    }
  };

  const onSetImage = async (e: any) => {
    setImage(e.target.files[0]);
    setImageSrc(URL.createObjectURL(e.target.files[0]));
  };
  const INITIAL_FORM_STATE = {
    fullname: name ? name : "",
    phone: "",
    university: "",
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
    <div className="form-filling">
      <Card style={{ padding: "5%" }}>
        <Formik
          initialValues={INITIAL_FORM_STATE}
          validationSchema={VALIDATE_SCHEMA}
          onSubmit={(values) => {
            handleRegistration(values);
          }}
        >
          <Form>
            <FormControl className="form-control">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "3%",
                }}
              >
                <Badge
                  overlap="circular"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  badgeContent={
                    <IconButton
                      onClick={() => fileRef.current?.click()}
                      style={{ backgroundColor: "white", opacity: "0.8" }}
                      size="small"
                    >
                      <i
                        className="las la-camera"
                        style={{
                          fontSize: "32px",
                          color: COLORS.appMainColor,
                        }}
                      ></i>
                      <input
                        ref={fileRef}
                        type="file"
                        name="myImage"
                        style={{ display: "none" }}
                        onChange={(e) => onSetImage(e)}
                      />
                    </IconButton>
                  }
                >
                  <Avatar src={imageSrc} className={classes.large} />
                </Badge>
              </div>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div className="title">
                    <hr />
                    <Typography
                      variant="h5"
                      display="block"
                      gutterBottom
                      style={{
                        textAlign: "center",
                        color: COLORS.appMainColor,
                      }}
                    >
                      Đăng kí tài khoản
                    </Typography>
                    <hr />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Textfield name="fullname" label="Họ và tên" />
                </Grid>
                <Grid item xs={12}>
                  <Textfield name="phone" label="Số điện thoại" />
                </Grid>
                <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <ThemeProvider theme={CALENDAR_THEME}>
                      <KeyboardDatePicker
                        variant="inline"
                        format="dd/MM/yyyy"
                        orientation="landscape"
                        margin="none"
                        id="date-picker-inline"
                        value={dateOfBirth}
                        label="Ngày sinh"
                        onChange={handleChangeDate}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                        autoOk={true}
                        required
                        fullWidth
                        disableFuture
                        inputVariant="outlined"
                        error={!dobValid}
                        helperText={
                          !dobValid
                            ? "Độ tuổi không phù hợp (yêu cầu từ 18 đến 25 tuối)"
                            : null
                        }
                      />
                    </ThemeProvider>
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={email}
                    disabled
                    variant="outlined"
                    fullWidth
                    label="Email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <University
                    name="university"
                    label="Trường đại học / cao đẳng"
                    options={universityList}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <GreenCheckbox
                      checked={check.checked}
                      onChange={handleChange}
                      name="checked"
                    />
                  }
                  label="Tôi đồng ý với những điều khoản đã kể trên"
                />
              </Grid> */}
                <Grid item xs={12}>
                  <CustomButton
                    style={{
                      backgroundColor: COLORS.appMainColor,
                      color: "white",
                    }}
                  >
                    Đăng kí
                  </CustomButton>
                </Grid>
                <Grid item xs={6}>
                  <Link
                    to="/home"
                    style={{
                      textDecoration: "none",
                      color: COLORS.appMainColor,
                    }}
                  >
                    <i className="las la-angle-left"></i>
                    <Typography variant="body1" display="inline">
                      Quay trở lại trang chủ
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </FormControl>
          </Form>
        </Formik>
      </Card>
      <OtpModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        phoneNumber={inputPhone}
        triggerRegistration={() => setStartRegistration(true)}
      />
    </div>
  );
};

export default Registration;
