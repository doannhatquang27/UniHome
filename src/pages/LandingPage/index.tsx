import { Grid } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import iOSImage from "../../assets/images/app-store-white-logo.png";
import AndroidImage from "../../assets/images/google-play-white-logo.png";
import LandingPageImage from "../../assets/images/landing-page.png";
import Logo from "../../assets/images/LOGO_small.png";
import LoadingFailed from "../../assets/images/undraw_empty_re_opql.svg";
import Footer from "../../components/Footer";
import { AuthContext } from "../../contexts/AuthContext";
import AuthSection from "./components/AuthSection";
import DistrictCarouselList from "./components/DistrictCarouselList";
import HouseList from "./components/HouseList";
import MenuRoute from "./components/MenuRoute";
import SharingRoomList from "./components/SharingRoomList";
import "./index.scss";

const LandingPage = () => {
  const { currentUser } = useContext(AuthContext);
  const [loadingFailed, setLoadingFailed] = useState(false);

  window.addEventListener("storage", function (e) {
    console.log(e);
    if (e.key === "detectMyChange" && e.newValue === "isScrolled") {
      this.window.scrollTo(0, 0);
    }
  });

  window.addEventListener("beforeunload", function (event) {
    this.localStorage.removeItem("detectMyChange");
  });

  return (
    <div>
      {/* <AppBar /> */}
      <div className="landing-image">
        <img
          src={LandingPageImage}
          alt="background"
          width="100%"
          className="landing-page_image--hidden"
        />
        <div className="landing-page_header">
          <img src={Logo} alt="logo" className="landing-page_header_logo" />

          <div className="landing-page_header_link-group">
            <a
              href="https://unihomelandingpage.gatsbyjs.io/homepage/app/"
              className="landing-page_link"
            >
              Về Unihome
            </a>
            <Link to="/home" className="landing-page_link">
              Thuê phòng
            </Link>
            {/* <Link to="/sharing" className="landing-page_link">
              Ở Ghép
            </Link> */}
            <AuthSection currentUser={currentUser} />
            <div className="menu-route">
              <MenuRoute />
            </div>
          </div>

          <span
            style={{ marginBottom: "2%" }}
            className="landing-page_content_first"
          >
            Tìm kiếm nhà trọ dễ dàng hơn với
          </span>
          <span className="landing-page_content_second">Unihome</span>
          <span
            style={{ marginTop: "4%", width: "40%" }}
            className="landing-page_content_third"
          >
            Unihome là ứng dụng đặc biệt giúp sinh viên có thể dễ dàng tìm kiếm
            nhà trọ an toàn, phù hợp với nhu cầu của mình
          </span>
          <div style={{ position: "absolute", bottom: "10%" }}>
            <img
              src={AndroidImage}
              alt="Google Play Link"
              style={{ height: "4vw" }}
            />
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <img
              src={iOSImage}
              alt="App Store Link"
              style={{ height: "4vw" }}
            />
            {/* <div className="landing-page_search-field">
              <SearchField
                changeSearchRoom={() => null}
                changeSearchUni={() => null}
                searchByNameValue={undefined}
              />
            </div> */}
          </div>
        </div>
      </div>
      <main>
        <div style={{ padding: "0 4vw" }}>
          {loadingFailed ? (
            <div className="empty-data">
              <img
                src={LoadingFailed}
                alt="loading failed"
                className="empty-data_image"
              />
              <span>Không tải được danh sách trọ</span>
            </div>
          ) : (
            <React.Fragment>
              <div className="district-list">
                <DistrictCarouselList />
              </div>
              <Grid
                container
                justifyContent="space-between"
                style={{ marginTop: 23 }}
              >
                <Grid item xs={12} md={8}>
                  <HouseList setLoadingFailed={() => setLoadingFailed(true)} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <div style={{ marginLeft: 20 }}>
                    <SharingRoomList />
                  </div>
                </Grid>
              </Grid>
            </React.Fragment>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
