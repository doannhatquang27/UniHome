import {
  Button,
  createStyles,
  Divider,
  Grid,
  makeStyles,
  Paper,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import PlaceHolderImage from "../../../../../assets/images/PlaceHolderImage.svg";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { FilterType } from "../../../../../enums/EnumFilterType";
import IHouse from "../../../../../interfaces/UniHouseApiInterfaces/IHouse";
import { getNavigationLinkToHouseDetail } from "../../../../../services/utils/navigation";
import GoogleMapModal from "../../GoogleMapModal";
import "./index.scss";

interface Props {
  house: IHouse;
  filterType?: string | null;
  openDrawer?: () => void;
  displayDistance?: boolean;
}

export enum HouseTypeEnum {
  TownHouse = "8fb3b3be-2e11-47ca-9fa1-1b24f15ef903",
  Apartment = "32449128-4251-4e31-86a7-2a7bbfc4e318",
  Dorm = "b812b53f-b119-4ea9-a57b-504148c04b46",
  Motel = "a2d9e01b-5b56-40a0-ae61-58e8798d0e0e",
}

const numberWithCommas = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const renderPriceMinPrice = (house: IHouse) => {
  const sortedList = house.rentTypes.sort(function (a, b) {
    return a.minPrice - b.minPrice;
  });
  const item = sortedList[0];

  return (
    <div>
      <Typography
        variant="body2"
        component="span"
        className="house-info__address"
      >
        Giá từ
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        <span className="house-footer_price">
          {numberWithCommas(item.minPrice)}đ&nbsp;
        </span>
        / {item.unitName}
      </Typography>
    </div>
  );
};

const HouseCardNew: React.FC<Props> = ({
  house,
  filterType,
  openDrawer,
  displayDistance,
}) => {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);
  const [openGgMapModal, setOpenGgMapModal] = useState(false);

  const handleOpenGgMapModal = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    setOpenGgMapModal(true);
  };

  return (
    <React.Fragment>
      <Paper className="house-card-new" classes={{ rounded: classes.rounded }}>
        <div className="card-content">
          <Link to={getNavigationLinkToHouseDetail(house)} className="link">
            {house.image ? (
              <div className="media">
                <img
                  alt="house"
                  className="media_image"
                  src={house.image}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = PlaceHolderImage;
                  }}
                />
                {house.image && house.hasSharing && (
                  <div className="media_label">
                    <span>Tìm ở ghép</span>
                  </div>
                )}
              </div>
            ) : null}
            <div className="house-info">
              <div className="house-info__house-name">
                <Typography
                  variant="subtitle1"
                  component="p"
                  className="house-info__house-name__text"
                >
                  {house.name}
                </Typography>
              </div>

              <div className="house-info__house-name">
                <Typography
                  variant="subtitle2"
                  component="p"
                  className="house-info__address"
                >
                  <span className="address">
                    {house.wardName}, {house.districtName}
                  </span>
                </Typography>
                <div
                  onClick={handleOpenGgMapModal}
                  className="address-navigate"
                >
                  <span className="las la-location-arrow address-navigate_icon"></span>
                  {/* <span>&nbsp;Vị trí</span> */}
                </div>
              </div>

              <Grid container>
                <Grid item xs={8}>
                  <Typography
                    variant="subtitle1"
                    component="p"
                    className="house-item"
                  >
                    {house.houseTypeId === HouseTypeEnum.Apartment ? (
                      <span className="las la-building icon-small icon" />
                    ) : (
                      <span className="las la-home icon-small icon" />
                    )}
                    <span>&nbsp;{house.houseTypeName}</span>
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    variant="subtitle2"
                    component="p"
                    className="house-item"
                  >
                    <span className="las la-expand-arrows-alt icon-small icon" />
                    {house.minArea !== house.maxArea ? (
                      <span>
                        &nbsp;{house.minArea} - {house.maxArea} m&#178;
                      </span>
                    ) : (
                      <span>&nbsp;{house.minArea} m&#178;</span>
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {/* <Typography
                    variant="subtitle1"
                    component="p"
                    className="house-item"
                  >
                    {renderGender(rentEntity.gender)}
                  </Typography> */}
                </Grid>
              </Grid>

              {(filterType && Number(filterType) === FilterType.nearMe) ||
              displayDistance ? (
                <Typography
                  variant="subtitle2"
                  component="p"
                  className="house-item"
                >
                  <span className="las la-route icon-small icon" />
                  <span>&nbsp;{Math.ceil(house.distance)} km</span>
                </Typography>
              ) : null}
            </div>
          </Link>

          <div style={{ padding: "0 4%" }}>
            <Divider />
          </div>
          <div className="house-footer">
            {renderPriceMinPrice(house)}

            {openDrawer !== undefined && (
              <div
                style={{
                  display:
                    currentUser &&
                    (currentUser.userId === house.ownerId ||
                      currentUser.userId === house.createdBy)
                      ? "none"
                      : "block",
                }}
              >
                <Button
                  classes={{ root: classes.buttonRoot }}
                  className="contact-button"
                  variant="contained"
                  size="small"
                  disableElevation
                  onClick={openDrawer}
                >
                  Liên hệ
                </Button>
              </div>
            )}
          </div>
        </div>
      </Paper>
      <GoogleMapModal
        house={house}
        open={openGgMapModal}
        onClose={() => setOpenGgMapModal(false)}
      />
    </React.Fragment>
  );
};

export default HouseCardNew;

const useStyles = makeStyles(() =>
  createStyles({
    rounded: {
      borderRadius: 4,
    },
    buttonRoot: {
      borderRadius: 4,
    },
  })
);
