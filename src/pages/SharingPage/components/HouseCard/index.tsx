import { Button, Divider, Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";
import { FilterType } from "../../../../enums/EnumFilterType";
import { Gender } from "../../../../enums/EnumGender";
import IRentEntity from "../../../../interfaces/UniHouseApiInterfaces/IRentEntity";
import { getNavigationLinkToRentDetail } from "../../../../services/utils/navigation";
import GoogleMapModal from "../GoogleMapModal";
import "./index.scss";

interface Props {
  rentEntity: IRentEntity;
  filterType?: string | null;
  openDrawer?: () => void;
}

const renderGender = (
  gender: Gender,
  maxPeople: number,
  currentPeople: number
) => {
  const getGenderAllowString = (gender: Gender) => {
    switch (gender) {
      case Gender.female:
        return "Chỉ cho nữ";
      case Gender.male:
        return "Chỉ cho nam";
      default:
        return "Cả nam và nữ";
    }
  };

  return (
    <React.Fragment>
      <div>
        <span className="las la-user-friends" />
        <span>&nbsp;{getGenderAllowString(gender)}</span>
      </div>
      <div>
        <span className="las la-user" />
        <span>
          &nbsp;Số thành viên hiện tại: {currentPeople} / {maxPeople}
        </span>
      </div>
    </React.Fragment>
  );
};

const HouseCard: React.FC<Props> = ({ rentEntity, filterType, openDrawer }) => {
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
      <Paper className="house-card">
        <div className="card-content">
          <Link to={getNavigationLinkToRentDetail(rentEntity)} className="link">
            {rentEntity.image ? (
              <div className="media">
                <img
                  alt={rentEntity.name}
                  className="media_image"
                  src={rentEntity.image}
                />

                <div className="media_label">
                  <span>Tìm ở ghép</span>
                </div>
              </div>
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

              <Typography
                variant="subtitle1"
                component="p"
                className="gender-sharing"
              >
                {renderGender(
                  rentEntity.gender,
                  rentEntity.maxPeople,
                  rentEntity.currentPeople
                )}
              </Typography>

              <Typography
                variant="subtitle2"
                component="p"
                className="house-info__address"
              >
                <span className="las la-expand-arrows-alt icon-small" />
                <span>&nbsp;{rentEntity.area} m&#178;</span>
              </Typography>

              {filterType && Number(filterType) === FilterType.nearMe ? (
                <Typography
                  variant="subtitle2"
                  component="p"
                  className="house-info__address"
                >
                  <span className="las la-route icon-medium" />
                  <span>{Math.ceil(rentEntity.distance)} km</span>
                </Typography>
              ) : null}
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

export default HouseCard;
