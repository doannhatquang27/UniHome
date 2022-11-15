import {
  Avatar,
  Badge,
  Box,
  createStyles,
  Grid,
  IconButton,
  LinearProgress,
  makeStyles,
  Tab,
  Tabs,
  Theme,
  ThemeProvider,
} from "@material-ui/core";
import firebase from "firebase/app";
import "firebase/storage"; // for storage
import { useSnackbar } from "notistack";
import React, { createRef, useContext, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { useLocation } from "react-router";
import AppBar from "../../components/AppBar";
import SimpleBackdrop from "../../components/utils/ProgressBackdrop";
import { COLORS } from "../../constants/color";
import { TAB_THEME } from "../../constants/theme";
import { AuthContext } from "../../contexts/AuthContext";
import IUser from "../../interfaces/UniHouseApiInterfaces/IUser";
import { getImageSource } from "../../services/fire-base";
import { updateProfile } from "../../services/user-services";
import Appointment from "./components/Appointment";
import ProfileSetting from "./components/ProfileSetting";
import SharingList from "./components/SharingList";
import TabPanel from "./components/TabPanel";
import "./index.scss";

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export enum TabEnum {
  "ProfileSetting",
  "Appointment",
  "SharingList",
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      width: theme.spacing(25),
      height: theme.spacing(25),
    },
    root: {
      "& .MuiPaper-root": {
        padding: 10,
      },
    },
    tab: {
      "& .MuiBox-root": {
        padding: "0px",
      },
    },
    flexContainerVertical: {
      display: "flex",
      alignItems: "center",
    },
    progressBarColorPrimary: {
      backgroundColor: COLORS.appSecondColor,
    },
    progressBarBar1Determinate: {
      backgroundColor: COLORS.appMainColor,
    },
  })
);

interface LocationStateProps {
  target: number;
}

interface TabValue {
  lable: string;
  index: number;
  classname: string;
  value: TabEnum;
  compareValue: TabEnum;
}

const renderTab = (data: TabValue) => {
  const { classname, compareValue, index, lable, value } = data;
  return (
    <Tab
      key={index}
      label={lable}
      {...a11yProps(index)}
      icon={
        <i
          className={classname}
          style={{
            fontSize: value === compareValue ? "28px" : "24px",
          }}
        ></i>
      }
    />
  );
};

const Profile = () => {
  const classes = useStyles();
  const { state } = useLocation<LocationStateProps>();
  const { currentUser, accessToken, updateCurrentUserContext } =
    useContext(AuthContext);
  const fileRef = createRef<HTMLInputElement>();
  const [transferred, setTransferred] = React.useState(0);
  const [uploading, setUploading] = React.useState(false);
  const [user, setUser] = React.useState<IUser>();
  const [value, setValue] = React.useState(TabEnum.ProfileSetting);
  const { enqueueSnackbar } = useSnackbar();

  const tabList: TabValue[] = [
    {
      lable: "Cập nhật thông tin",
      index: 0,
      classname: "las la-user",
      value,
      compareValue: TabEnum.ProfileSetting,
    },
    {
      lable: "Lịch hẹn",
      index: 1,
      classname: "las la-calendar",
      value,
      compareValue: TabEnum.Appointment,
    },
    // {
    //   lable: "Bài đăng",
    //   index: 2,
    //   classname: "las la-home",
    //   value,
    //   compareValue: TabEnum.SharingList,
    // },
  ];

  useEffect(() => {
    if (state && typeof state.target === "number") {
      setValue(state.target);
    }
  }, [state]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const uploadImage = async (image: any, name: any) => {
    const uploadTask = firebase
      .storage()
      .ref("images/profile/" + name)
      .put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setTransferred(
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        );
      },
      (error) => console.error(error)
    );

    await uploadTask.then(async () => {
      await firebase
        .storage()
        .ref("images/profile/" + name)
        .getDownloadURL();
    });

    try {
      await uploadTask;
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdateImage = async (e: any) => {
    const image = e.target.files[0];
    setUploading(true);
    await uploadImage(image, user?.email);
    const imageSrc = await getImageSource(user?.email);
    const updatedUser: IUser = {
      userId: user?.userId!,
      fullname: user?.fullname!,
      phone: user?.phone!,
      dateOfBirth: user?.dateOfBirth!,
      email: user?.email!,
      image: imageSrc!,
      role: user?.role!,
      roleId: user?.roleId!,
      roleName: user?.roleName!,
      status: user?.status!,
      universityId: user?.universityId!,
      address: user?.address!,
      citizenNumber: user?.citizenNumber!,
      citizenNumberDate: user?.citizenNumberDate!,
      gender: user?.gender!,
      lastModified: user?.lastModified!,
      modifiedBy: user?.modifiedBy!,
      statusString: user?.statusString!,
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
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser]);

  return (
    <div className="profile-page">
      <AppBar />
      {currentUser ? (
        <main>
          <div
            className="profile-page_main_container"
            style={{ width: isMobile ? "100%" : "70%" }}
          >
            <Grid container spacing={2}>
              {isMobile ? null : (
                <Grid item xs={3}>
                  <Box
                    marginTop={4}
                    paddingTop={4}
                    paddingBottom={4}
                    paddingRight={1}
                    paddingLeft={1}
                    className="profile-page_main_box"
                  >
                    <div className="profile-page_main_avatar">
                      <Badge
                        overlap="circular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        badgeContent={
                          <div>
                            <IconButton
                              style={{ background: "rgba(22, 165, 150, .8)" }}
                              onClick={() => fileRef.current?.click()}
                            >
                              <input
                                ref={fileRef}
                                type="file"
                                name="myImage"
                                style={{ display: "none" }}
                                onChange={(e) => onUpdateImage(e)}
                              />
                              <i
                                className="las la-camera"
                                style={{ color: "white" }}
                              ></i>
                            </IconButton>
                          </div>
                        }
                      >
                        <Avatar
                          src={user?.image || ""}
                          className={classes.large}
                        />
                      </Badge>
                    </div>

                    {uploading ? (
                      <div>
                        <LinearProgress
                          variant="determinate"
                          value={transferred}
                          className="progress-bar"
                          classes={{
                            colorPrimary: classes.progressBarColorPrimary,
                            bar1Determinate: classes.progressBarBar1Determinate,
                          }}
                        />
                      </div>
                    ) : null}

                    <ThemeProvider theme={TAB_THEME}>
                      <Tabs
                        orientation="vertical"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        centered
                        variant="fullWidth"
                      >
                        {tabList.map((tab) => renderTab(tab))}
                      </Tabs>
                    </ThemeProvider>
                  </Box>
                </Grid>
              )}

              <Grid item xs={isMobile ? 12 : 9}>
                <TabPanel value={value} index={TabEnum.ProfileSetting}>
                  <ProfileSetting />
                </TabPanel>
                <TabPanel value={value} index={TabEnum.Appointment}>
                  <Appointment />
                </TabPanel>
                {/* <TabPanel value={value} index={TabEnum.SharingList}>
                  <SharingList />
                </TabPanel> */}
              </Grid>
            </Grid>
          </div>
        </main>
      ) : (
        <SimpleBackdrop isLoading={true} />
      )}
    </div>
  );
};

export default Profile;
