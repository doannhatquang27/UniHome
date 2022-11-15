import { Button, Divider, Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";
import { Gender } from "../../../../enums/EnumGender";
import IRentEntity from "../../../../interfaces/UniHouseApiInterfaces/IRentEntity";
import { getNavigationLinkToRentDetail } from "../../../../services/utils/navigation";
import GoogleMapModal from "../../../HomePage/components/GoogleMapModal";
import "./index.scss";

interface Props {
  rentEntity: IRentEntity;
  openDrawer?: () => void;
}

const renderGender = (gender: Gender) => {
  switch (gender) {
    case Gender.all:
      return (
        <React.Fragment>
          <span className="las la-user-friends" />
          <span>&nbsp;1-2 người (nam, nữ)</span>
        </React.Fragment>
      );
    case Gender.male:
      return (
        <React.Fragment>
          <span className="las la-user-friends" />
          <span>&nbsp;1-2 người (nam)</span>
        </React.Fragment>
      );
    case Gender.female:
      return (
        <React.Fragment>
          <span className="las la-user-friends" />
          <span>&nbsp;1-2 người (nữ)</span>
        </React.Fragment>
      );
  }
};

const HouseCardWithDistanceFromUniversity: React.FC<Props> = ({
  rentEntity,
  openDrawer,
}) => {
  const { currentUser } = useContext(AuthContext);
  const [openGgMapModal, setOpenGgMapModal] = useState(false);

  const numberWithCommas = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleOpenGgMapModal = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    setOpenGgMapModal(true);
  };

  return (
    <React.Fragment>
      <Paper className="house-card-uni">
        <div className="card-content">
          <Link to={getNavigationLinkToRentDetail(rentEntity)} className="link">
            {rentEntity.image ? (
              <img alt="house" className="media" src={rentEntity.image} />
            ) : null}
            <div className="house-info">
              <div className="house-info__house-name">
                <Typography
                  variant="subtitle1"
                  component="p"
                  className="house-info__house-name__text"
                >
                  {rentEntity.name}
                </Typography>
                <div
                  onClick={handleOpenGgMapModal}
                  className="address-navigate"
                >
                  <span className="las la-location-arrow address-navigate_icon"></span>
                  <span>&nbsp;Vị trí</span>
                </div>
              </div>

              <Typography
                variant="subtitle2"
                component="p"
                className="house-info__address"
              >
                <span className="address">{rentEntity.house.fullAddress}</span>
              </Typography>

              <Typography variant="subtitle1" component="p" className="gender">
                {renderGender(rentEntity.gender)}
              </Typography>

              <Typography
                variant="subtitle2"
                component="p"
                className="house-info__address"
              >
                <span className="las la-expand-arrows-alt icon-small" />
                <span>&nbsp;{rentEntity.area} m&#178;</span>
              </Typography>

              {rentEntity.house.uniHouses.length > 0 && (
                <Typography
                  variant="subtitle2"
                  component="p"
                  className="house-info__address"
                >
                  <span className="las la-route icon-small" />
                  <span>
                    &nbsp;Cách trường {rentEntity.house.uniHouses[0].distance}{" "}
                    km
                  </span>
                </Typography>
              )}
            </div>
          </Link>

          <Divider />
          <div className="house-footer">
            <div>
              <Typography
                variant="subtitle1"
                component="p"
                className="house-info__address"
              >
                Giá phòng
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <span className="house-footer_price">
                  {numberWithCommas(rentEntity.price)} VNĐ&nbsp;
                </span>
                / tháng
              </Typography>
            </div>
            <div
              style={{
                display:
                  currentUser && currentUser.userId === rentEntity.house.ownerId
                    ? "none"
                    : "block",
              }}
            >
              <Button
                className="contact-button"
                variant="contained"
                size="small"
                disableElevation
                onClick={openDrawer}
              >
                Liên hệ
              </Button>
            </div>
          </div>
        </div>
      </Paper>
      <GoogleMapModal
        house={rentEntity.house}
        open={openGgMapModal}
        onClose={() => setOpenGgMapModal(false)}
      />
    </React.Fragment>
  );
};

export default HouseCardWithDistanceFromUniversity;
