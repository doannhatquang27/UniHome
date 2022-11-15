import {
  Button,
  createStyles,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Theme,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { NotFoundPage } from "..";
import AppBar from "../../components/AppBar";
import Carousel from "../../components/Carousel";
import Footer from "../../components/Footer";
import MyGoogleMap from "../../components/utils/MyGoogleMap";
import SimpleBackdrop from "../../components/utils/ProgressBackdrop";
import { AuthContext } from "../../contexts/AuthContext";
import { GenerateConfirmPaymentSignature } from "../../interfaces/PaymentInformation";
import IHouse from "../../interfaces/UniHouseApiInterfaces/IHouse";
import IRentType from "../../interfaces/UniHouseApiInterfaces/IRentType";
import {
  getHouseByIdAPI,
  getHouseListForCarouselAPI,
} from "../../services/house-services";
import { handleConfirmPayment } from "../../services/utils/payment";
import BookingForm from "./components/BookingForm";
import FacilityListForHouse from "./components/FacilityListForHouse";
import FullHouseInformation from "./components/FullHouseInformation";
import ImageGrid from "./components/ImageGrid";
import OwnerInformation from "./components/OwnerInformation";
import PoiMap from "./components/PoiMap";
import QuestionSection from "./components/QuestionSection";
import RentOfHouseList from "./components/RentOfHouseList";
import "./index.scss";

const ID_LENGTH = 36;

type Params = {
  id: string;
};

interface IState {
  confirmPaymentData: GenerateConfirmPaymentSignature;
  signature: string;
}

const checkHouseIsFullHouse = (house: IHouse) => {
  let result = false;

  if (house.hasSharing) {
    return true;
  }

  house.rentTypes.forEach((item) => {
    if (item.name === "Thuê nguyên căn") {
      result = true;
    }
  });
  return result;
};

const RentDetail = () => {
  const { currentUser, accessToken } = useContext(AuthContext);
  const location = useLocation();
  let { id } = useParams<Params>();
  const [imageUrlList, setImageUrlList] = useState<string[]>([]);
  const [house, setHouse] = useState<IHouse>();
  // const [rentEntity, setRentEntity] = useState<IRentEntity>();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [relativeList, setRelativeList] = useState<IHouse[]>([]);
  const [isNotFound, setNotFound] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const classes = useStyles();
  const state = location.state as IState;
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    const fetchRelativeHouseList = async (house: IHouse) => {
      const result = await getHouseListForCarouselAPI(
        1,
        10,
        undefined,
        house.wardId
      );
      if (result) {
        setRelativeList(
          result.houses.filter((item) => item.houseId !== house.houseId)
        );
      }

      if (!result || (result && result.houses.length === 1)) {
        const sameDistrictResult = await getHouseListForCarouselAPI(
          1,
          10,
          house.districtId,
          undefined
        );
        if (sameDistrictResult) {
          setRelativeList(
            sameDistrictResult.houses.filter(
              (item) => item.houseId !== house.houseId
            )
          );
        }
      }
    };
    if (house) {
      fetchRelativeHouseList(house);
    }
  }, [house]);

  useEffect(() => {
    const addTransaction = async (accessToken: string) => {
      const result = await handleConfirmPayment(
        state.confirmPaymentData,
        state.signature,
        accessToken
      );
      if (result) {
        enqueueSnackbar("Thanh toán thành công", {
          variant: "success",
          transitionDuration: { enter: 400, exit: 200 },
        });
      }
    };

    if (state && state.confirmPaymentData && state.signature && accessToken) {
      addTransaction(accessToken);
    }
  }, [accessToken, enqueueSnackbar, state]);

  const getHouseDetailById = React.useCallback(async () => {
    const newId = id.substring(id.length - ID_LENGTH);
    const result = await getHouseByIdAPI(newId);
    if (result !== undefined) {
      setHouse(result);
      setLoading(false);
      setImageUrlList(result.image.split(";"));
    } else {
      setNotFound(true);
    }
  }, [id]);

  React.useEffect(() => {
    getHouseDetailById();
  }, [getHouseDetailById]);

  const numberWithCommas = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // const getGenderAllowString = (gender: Gender) => {
  //   switch (gender) {
  //     case Gender.female:
  //       return "Chỉ cho nữ";
  //     case Gender.male:
  //       return "Chỉ cho nam";
  //     default:
  //       return "Cả nam và nữ";
  //   }
  // };

  function renderHouseInfor(house: IHouse) {
    return (
      <React.Fragment>
        <span className="title">Thông tin nhà</span>

        <div className="content">
          <span className="label">Địa chỉ: </span>
          <span>{house.fullAddress}</span>
        </div>

        <div className="content">
          <span className="label">Diện tích: </span>
          {house.minArea === house.maxArea ? (
            <span>{house.minArea} m&#178;</span>
          ) : (
            <span>
              {house.minArea} m&#178; - {house.maxArea} m&#178;
            </span>
          )}
        </div>

        <span className="content">
          <span className="label">Tình trạng: </span>
          <span>{house.statusString}</span>
        </span>
      </React.Fragment>
    );
  }

  function renderMain() {
    return (
      <main>
        {house && (
          <React.Fragment>
            <div
            // style={{ padding: "0 4vw" }}
            >
              <ImageGrid imageList={imageUrlList} />
            </div>
            {/* Thông tin section */}
            <div className="padding-section">
              <div className="house-detail_name-and-price">
                <div className="name-and-date">
                  <span className="rent-name">{house.name}</span>
                  <span>{house.fullAddress}</span>
                </div>
                <div className="price-unit">
                  <span className="unit">Giá từ&nbsp;</span>
                  <span className="price">
                    {house.minPrice ? numberWithCommas(house.minPrice) : ""} VNĐ
                  </span>
                  <span className="unit">/tháng</span>
                </div>
              </div>

              <Grid container justifyContent="center">
                <Grid item xs={12} lg={8}>
                  {/* Thông tin phòng */}
                  {/* <Paper elevation={1} className="house-detail_section-card">
                    <div className="house-detail_section-block">
                      {renderHouseInfor(house)}
                    </div>
                  </Paper> */}

                  {checkHouseIsFullHouse(house) ? (
                    <FullHouseInformation rentEntity={house.rentEntity} />
                  ) : (
                    <React.Fragment>
                      <div className="house-detail_section-block">
                        <FacilityListForHouse
                          facilityList={house.rentFacilities}
                        />
                      </div>

                      <div style={{ margin: "0 56px" }}>
                        <Divider />
                      </div>

                      {/* Description */}
                      <div className="house-detail_section-block">
                        <RentOfHouseList house={house} />
                      </div>
                    </React.Fragment>
                  )}

                  <div style={{ margin: "0 56px" }}>
                    <Divider />
                  </div>

                  {/* POI map */}
                  <div className="house-detail_section-block">
                    <PoiMap
                      latitude={house.latitude}
                      longitude={house.longitude}
                      placeName={house.name}
                    />
                  </div>

                  <div style={{ margin: "0 56px" }}>
                    <Divider />
                  </div>

                  {/* Q&A */}
                  <div>
                    <QuestionSection house={house} />
                  </div>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Paper
                    elevation={1}
                    className="house-detail_section-card house-detail_section-card_profile"
                  >
                    <div className="house-detail_section-block owner-infor-block">
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <OwnerInformation house={house!} />
                        <Button
                          classes={{ root: classes.buttonRoot }}
                          onClick={() => setShowBookingForm(!showBookingForm)}
                          variant="outlined"
                          className="booking-toggle-button"
                          size="large"
                        >
                          Hẹn giờ với người đăng
                        </Button>

                        {/* Hẹn lịch với người đăng */}
                        <div>
                          {showBookingForm ? (
                            <div className="booking-form">
                              <BookingForm house={house} />
                            </div>
                          ) : null}
                        </div>
                        {/* Bản đồ */}
                        <div
                          style={{
                            display: "flex",
                            flex: 1,
                            flexDirection: "column",
                          }}
                        >
                          {house ? (
                            <div style={{ width: "100%", zIndex: 5 }}>
                              <MyGoogleMap house={house} />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
              <Divider style={{ margin: "25px 0" }} />
            </div>

            <div style={{ paddingLeft: "4vw", paddingRight: "4vw" }}>
              <span className="similar-title">Tin đăng tương tự</span>
              <Carousel houseList={relativeList} />
            </div>
          </React.Fragment>
        )}
      </main>
    );
  }

  return (
    <div className="house-detail">
      <AppBar />
      {isNotFound ? <NotFoundPage /> : renderMain()}
      <SimpleBackdrop isLoading={isLoading} />
      <div className="footer-component">
        <Footer />
      </div>
    </div>
  );
};

export default RentDetail;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonRoot: {
      borderRadius: 4,
    },
  })
);
