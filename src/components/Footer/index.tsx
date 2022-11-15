/* eslint-disable jsx-a11y/anchor-is-valid */
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import AppStoreLink from "../../assets/images/footer/app-store-white-logo.png";
import GooglePlayLink from "../../assets/images/footer/google-play-white-logo.png";
import logo from "../../assets/images/LOGO_small.png";
import "./index.scss";

const Footer = () => {
  return (
    <div className="footer">
      <Grid container alignItems="center">
        <Grid item xs={2} className="footer_column footer_column_first">
          <img src={logo} alt="logo" width="100%" />
          <div className="space" />
          <Link
            to="/rules-and-regulations"
            target="_blank"
            className="footer_link"
          >
            Điều khoản và chính sách
          </Link>
        </Grid>

        <Grid item xs className="footer_column" />

        <Grid item xs className="footer_column" />

        <Grid item xs className="footer_column" />

        <Grid item xs className="footer_column">
          <a href="#">
            <img src={AppStoreLink} alt="App Store" />
          </a>
        </Grid>

        <Grid item xs className="footer_column">
          <a href="#">
            <img src={GooglePlayLink} alt="Google Play" />
          </a>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
