import {
  Button,
  createStyles,
  Divider,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { NotFoundPage } from "..";
import AppBar from "../../components/AppBar";
import Footer from "../../components/Footer";
import PaymentComponent from "../../components/Payment";
import CustomBreadcrumb from "../../components/utils/CustomBreadcrumb";
import MyGoogleMap from "../../components/utils/MyGoogleMap";
import { COLORS } from "../../constants/color";
import { AuthContext } from "../../contexts/AuthContext";
import { Gender } from "../../enums/EnumGender";
import { BreadCrumb } from "../../interfaces/Breadcrumb";
import { GenerateConfirmPaymentSignature } from "../../interfaces/PaymentInformation";
import IHouse from "../../interfaces/UniHouseApiInterfaces/IHouse";
import IRentEntity from "../../interfaces/UniHouseApiInterfaces/IRentEntity";
import {
  loadAllAvailableRentEntitiesAPI,
  loadAvailableRentByIdAPI,
} from "../../services/rent-services";
import { convertDBDateTimeToDateString } from "../../services/utils/datetime";
import { handleConfirmPayment } from "../../services/utils/payment";
import BookingForm from "./components/BookingForm";
import HouseFacitityAndService from "./components/HouseFacilitiesAndServices";
import ImageGrid from "./components/ImageGrid";
import OwnerInformation from "./components/OwnerInformation";
import "./index.scss";

const ID_LENGTH = 36;

type Params = {
  id: string;
};

interface IState {
  confirmPaymentData: GenerateConfirmPaymentSignature;
  signature: string;
}

const RentDetail = () => {
  const { currentUser, accessToken } = useContext(AuthContext);
  const location = useLocation();
  let { id } = useParams<Params>();
  const [imageUrlList, setImageUrlList] = useState<string[]>([]);
  const [house, setHouse] = useState<IHouse>();
  const [rentEntity, setRentEntity] = useState<IRentEntity>();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [relativeRE_List, setRelativeList] = useState<IRentEntity[]>([]);
  const [isNotFound, setNotFound] = useState(false);
  const classes = useStyles();
  const state = location.state as IState;
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    const fetchRelativeRentEntityList = async () => {
      const result = await loadAllAvailableRentEntitiesAPI(1);
      if (result) {
        setRelativeList(result.rentEntities);
      }
    };
    fetchRelativeRentEntityList();
  }, []);

  useEffect(() => {
    const addTransaction = async (accessToken: string) => {
      const result = await handleConfirmPayment(
        state.confirmPaymentData,
        state.signature,
        accessToken
      );
      if (result) {
        enqueueSnackbar("Thanh to??n th??nh c??ng", {
          variant: "success",
          transitionDuration: { enter: 400, exit: 200 },
        });
      }
    };

    if (state && state.confirmPaymentData && state.signature && accessToken) {
      addTransaction(accessToken);
    }
  }, [accessToken, enqueueSnackbar, state]);

  const getRentEntityById = React.useCallback(async () => {
    const newId = id.substring(id.length - ID_LENGTH);
    const result = await loadAvailableRentByIdAPI(newId);
    if (result !== undefined) {
      setRentEntity(result);
      setImageUrlList(result.image.split(";"));
      setHouse(result.house);
    } else {
      setNotFound(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  React.useEffect(() => {
    getRentEntityById();
  }, [getRentEntityById]);

  const breadcrumbList: BreadCrumb[] = [
    { label: "Home", to: "/home" },
    { label: house && house.name ? house.name : "House name" },
  ];

  const numberWithCommas = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const getGenderAllowString = (gender: Gender) => {
    switch (gender) {
      case Gender.female:
        return "Ch??? cho n???";
      case Gender.male:
        return "Ch??? cho nam";
      default:
        return "C??? nam v?? n???";
    }
  };

  function renderRoomInfor(rentEntity: IRentEntity) {
    return (
      <React.Fragment>
        <span className="title">Th??ng tin ph??ng</span>

        <div className="content">
          <span className="label">?????a ch???: </span>
          <span>{rentEntity.house.fullAddress}</span>
        </div>

        <div className="content">
          <span className="label">?????i t?????ng: </span>
          <span>{getGenderAllowString(rentEntity.gender)}</span>
        </div>

        <div className="content">
          <span className="label">T???i ??a: </span>
          <span>{rentEntity.maxPeople} ng?????i</span>
        </div>

        <div className="content">
          <span className="label">S??? th??nh vi??n hi???n t???i: </span>
          <span>
            {rentEntity.currentPeople > 0
              ? rentEntity.currentPeople + " ng?????i"
              : 0}
          </span>
        </div>

        <div className="content">
          <span className="label">Di???n t??ch: </span>
          <span>{rentEntity.area} m&#178;</span>
        </div>

        <div className="content">
          <span className="label">?????t c???c: </span>
          <span>
            {rentEntity?.depositPrice
              ? numberWithCommas(rentEntity?.depositPrice)
              : ""}{" "}
            VN??
          </span>
          <PaymentComponent rentEntity={rentEntity} rentEntityQuery={id} />
        </div>

        <span className="content">
          <span className="label">T??nh tr???ng: </span>
          <span>{rentEntity.status}</span>
        </span>
      </React.Fragment>
    );
  }

  function renderMain() {
    return (
      <main>
        <CustomBreadcrumb breadcrumbList={breadcrumbList} />
        <ImageGrid imageList={imageUrlList} />
        {/* Th??ng tin section */}
        <div className="padding-section">
          <div className="rent-detail_name-and-price">
            <div className="name-and-date">
              <span className="rent-name">{rentEntity?.name}</span>
              <span className="date">
                Ng??y ????ng:{" "}
                {rentEntity &&
                  convertDBDateTimeToDateString(rentEntity.createdTime)}
                {rentEntity?.authorName !== null && (
                  <span> b???i {rentEntity?.authorName}</span>
                )}
              </span>
            </div>
            <div className="price-unit">
              <span className="price">
                {rentEntity?.price ? numberWithCommas(rentEntity?.price) : ""}{" "}
                VN??
              </span>
              <span className="unit">/th??ng</span>
            </div>
          </div>

          <Grid container justifyContent="center">
            <Grid item xs={12} lg={8}>
              {/* Th??ng tin ph??ng */}
              <div className="rent-detail_section-block">
                {rentEntity && renderRoomInfor(rentEntity)}
              </div>

              {/* Ti???n ??ch */}
              <div className="rent-detail_section-block">
                {rentEntity ? (
                  <React.Fragment>
                    <HouseFacitityAndService
                      rentFacilities={rentEntity.rentFacility}
                      rentServives={rentEntity.rentService}
                    />
                  </React.Fragment>
                ) : null}
              </div>

              {/* Description */}
              <div className="rent-detail_section-block">
                <span className="title">M?? t???:</span>
                <span className="content">{rentEntity?.description}</span>
              </div>
              <Divider />
            </Grid>
            <Grid item xs={12} lg={4}>
              <div className="rent-detail_section-block owner-infor-block">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {currentUser &&
                  rentEntity &&
                  currentUser.userId === rentEntity.house.ownerId ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      className="delete-post-button"
                    >
                      X??a b??i ????ng
                    </Button>
                  ) : (
                    <React.Fragment>
                      <OwnerInformation house={house!} />
                      <Button
                        classes={{ root: classes.buttonRoot }}
                        onClick={() => setShowBookingForm(!showBookingForm)}
                        variant="outlined"
                        className="booking-toggle-button"
                        size="large"
                      >
                        H???n gi??? v???i ng?????i ????ng
                      </Button>
                    </React.Fragment>
                  )}

                  {/* H???n l???ch v???i ng?????i ????ng */}
                  <div>
                    {showBookingForm ? (
                      <div
                        className="booking-form"
                        style={{ backgroundColor: COLORS.appSecondColor }}
                      >
                        {rentEntity ? (
                          <BookingForm
                            houseId={rentEntity.houseId}
                            bookingSlot={rentEntity.house.bookingSlots}
                          />
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                  {/* B???n ????? */}
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
            </Grid>
          </Grid>
          <Divider style={{ margin: "25px 0" }} />
        </div>

        <div style={{ paddingLeft: "4vw", paddingRight: "4vw" }}>
          <span className="similar-title">Tin ????ng t????ng t???</span>
          {/* <Carousel rentEntities={relativeRE_List} /> */}
        </div>
      </main>
    );
  }

  return (
    <div className="rent-detail">
      <AppBar />

      {isNotFound ? <NotFoundPage /> : renderMain()}

      <div className="footer-component">
        <Footer />
      </div>
    </div>
  );
};

export default RentDetail;

const useStyles = makeStyles(() =>
  createStyles({
    buttonRoot: {
      borderRadius: 4,
    },
  })
);
