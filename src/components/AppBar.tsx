import { Avatar, Chip, Grid, Tooltip } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import { Event, ExitToApp, House, School } from "@material-ui/icons";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import React, { useContext } from "react";
import { isMobile } from "react-device-detect";
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import logo from "../assets/images/LOGO_small.png";
import smallLogo from "../assets/images/small-logo.png";
import { COLORS } from "../constants/color";
import { AuthContext } from "../contexts/AuthContext";
import { UniversityOptionProps } from "../pages/HomePage";
import { TabEnum } from "../pages/Profile";
import "./index.scss";
import HeadLine from "./utils/HeadLine";
import LoginButton from "./utils/LoginButton";
import SearchField from "./utils/SearchField";

interface Props {
  searchByNameValue?: string;
  changeSearchRoom?: (value: string) => void;
  changeSearchUni?: (value: UniversityOptionProps) => void;
}

const RenderSearchScreen = ["home", "type", "university", "house-detail"];

const PrimarySearchAppBar: React.FC<Props> = ({
  searchByNameValue,
  changeSearchRoom,
  changeSearchUni,
}) => {
  let history = useHistory();
  let location = useLocation();
  const { currentUser, logout } = useContext(AuthContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const checkRenderSearch = () => {
    const fullPath = location.pathname;
    const currentRoute = fullPath.split("/")[1];
    return RenderSearchScreen.find((x) => x === currentRoute) !== undefined;
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogout = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    logout();
    history.push("/home");
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      getContentAnchorEl={null}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <NavLink to="/profile" style={{ textDecoration: "none" }}>
          Profile
        </NavLink>
      </MenuItem>
      {/* <MenuItem>
        <NavLink to="/university" style={{ textDecoration: "none" }}>
          Trường Đại học
        </NavLink>
      </MenuItem> */}
      <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = currentUser ? (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={() => {
          history.push({
            pathname: "/profile",
            state: { target: TabEnum.ProfileSetting },
          });
          handleMenuClose();
        }}
      >
        <IconButton aria-label="show 4 new mails" color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Thông tin cá nhân</p>
      </MenuItem>

      <MenuItem
        onClick={() => {
          history.push({
            pathname: "/profile",
            state: { target: TabEnum.Appointment },
          });
          handleMenuClose();
        }}
      >
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Event />
        </IconButton>
        <p>Lịch hẹn</p>
      </MenuItem>

      <MenuItem
        onClick={() => {
          history.push({
            pathname: "/profile",
            state: { target: TabEnum.SharingList },
          });
          handleMenuClose();
        }}
      >
        <IconButton
          aria-label="profile"
          color="inherit"
          onClick={() => history.push("/profile")}
        >
          <House />
        </IconButton>
        <p>Share Phòng</p>
      </MenuItem>

      <MenuItem>
        <IconButton aria-label="log out" color="inherit" onClick={handleLogout}>
          <ExitToApp />
        </IconButton>
        <p>Đăng xuất</p>
      </MenuItem>
    </Menu>
  ) : (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <LoginButton />
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <HeadLine />
      <AppBar
        position="static"
        className={
          location.pathname.split("/")[1] !== "house-detail"
            ? classes.appBar
            : classes.appBarWithoutBottomBorder
        }
      >
        <Toolbar classes={{ gutters: classes.gutters }}>
          <Grid container>
            <Grid item xs={2}>
              {isMobile ? (
                <Link to="/">
                  <img src={smallLogo} alt="logo" height="48px" />
                </Link>
              ) : (
                <Link to="/">
                  <img src={logo} alt="logo" height="48px" />
                </Link>
              )}
            </Grid>
            <Grid item xs={4}>
              {checkRenderSearch() && (
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <SearchField
                    changeSearchRoom={changeSearchRoom}
                    changeSearchUni={changeSearchUni}
                    searchByNameValue={searchByNameValue}
                  />
                </div>
              )}
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={1}>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Tooltip title="Trường Đại học">
                  <Chip
                    variant="default"
                    classes={{ root: classes.chipRoot }}
                    avatar={<School style={{ color: COLORS.appMainColor }} />}
                    label="Trường Đại học"
                    onClick={() => {
                      history.push({
                        pathname: "/university",
                      });
                    }}
                  />
                </Tooltip>
              </div>

              {/* <IconButton
                  style={{
                    marginLeft: 3,
                    marginRight: 3,
                    backgroundColor: "white",
                    color: COLORS.appMainColor,
                  }}
                  onClick={() => {
                    history.push({
                      pathname: "/university",
                    });
                  }}
                >
                  <School />
                </IconButton> */}
            </Grid>
            <Grid item xs={2}>
              {/* <div className={classes.grow} /> */}
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <div className={classes.sectionDesktop}>
                  {currentUser ? (
                    <React.Fragment>
                      <Chip
                        variant="default"
                        classes={{ root: classes.chipRoot }}
                        avatar={<Avatar src={currentUser.image} />}
                        label={currentUser.fullname}
                        onClick={handleProfileMenuOpen}
                      />
                    </React.Fragment>
                  ) : (
                    <LoginButton />
                  )}
                </div>
                <div className={classes.sectionMobile}>
                  <IconButton
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    style={{
                      color: COLORS.appMainColor,
                    }}
                  >
                    <MoreIcon />
                  </IconButton>
                </div>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

export default PrimarySearchAppBar;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      backgroundColor: "white",
      boxShadow: "none",
      borderBottom: "1px solid",
      borderBottomColor: COLORS.appMainColor,
    },
    appBarWithoutBottomBorder: {
      backgroundColor: "white",
      boxShadow: "none",
    },
    gutters: {
      paddingLeft: isMobile ? 0 : "4vw",
      paddingRight: isMobile ? 0 : "3vw",
    },
    grow: {
      flexGrow: 1,
      position: "sticky",
      top: 0,
      zIndex: 10,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      flexGrow: 1,
      borderRadius: 25,
      border: "2px solid",
      borderColor: COLORS.appMainColor,
      backgroundColor: "white",
      marginRight: isMobile ? 0 : theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      color: "white",
      backgroundColor: COLORS.appMainColor,
      borderRadius: 25,
      padding: "0 4.5px",
      height: "calc(100% - 4px)",
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      right: 0,
      margin: 2,
    },
    inputRoot: {
      color: COLORS.appMainColor,
      fontWeight: 300,
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 1),
      // vertical padding + font size from searchIcon
      paddingRight: `calc(1em + ${theme.spacing(1)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
        alignItems: "center",
        flex: 1,
        justifyContent: "flex-end",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    chipRoot: {
      backgroundColor: "white",
      "&:hover": {
        backgroundColor: "#D4EBDB",
      },
    },
    selectSelect: {
      paddingLeft: 12,
    },
  })
);
