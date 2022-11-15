import { Button, Divider, Grid } from "@material-ui/core";
import React, { useState } from "react";
import PlaceHolderImage from "../../../../../assets/images/PlaceHolderImage.svg";
import { Gender } from "../../../../../enums/EnumGender";
import IRentEntity from "../../../../../interfaces/UniHouseApiInterfaces/IRentEntity";
import RentModal from "../../RentModal";
import "./index.scss";

interface Props {
  rentEntity: IRentEntity;
}

const renderGender = (gender: Gender, current: number, max: number) => {
  switch (gender) {
    case Gender.maleAndFemale:
      return (
        <React.Fragment>
          <span className="las la-user-friends icon" />
          <span>
            &nbsp;&nbsp;{current}/{max} người (nam, nữ)
          </span>
        </React.Fragment>
      );
    case Gender.male:
      return (
        <React.Fragment>
          <span className="las la-user-friends icon" />
          <span>
            &nbsp;&nbsp;{current}/{max} người (nam)
          </span>
        </React.Fragment>
      );
    case Gender.female:
      return (
        <React.Fragment>
          <span className="las la-user-friends icon" />
          <span>
            &nbsp;&nbsp;{current}/{max} người (nữ)
          </span>
        </React.Fragment>
      );
  }
};

const RentOfHouseHorizontal: React.FC<Props> = ({ rentEntity }) => {
  const [toggleModal, setToggleModal] = useState(false);

  const numberWithCommas = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <React.Fragment>
      <div className="rent-item-house-detail">
        <div className="rent-item-house-detail_image--block">
          <img
            src={rentEntity.image}
            alt={rentEntity.name}
            className="rent-item-house-detail_image--block_img"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = PlaceHolderImage;
            }}
          />
        </div>

        <div className="rent-item-house-detail_image">
          <div
            style={{
              backgroundImage: `url(${rentEntity.image}), url(${PlaceHolderImage})`,
            }}
            className="rent-item-house-detail_image_background"
          />
        </div>

        {/* Info */}
        <div
          style={{
            display: "flex",
            flex: 3,
            flexDirection: "column",
            minHeight: "20vh",
          }}
        >
          <div className="rent-item-house-detail_info">
            <div className="name-and-price">
              {/* <a
                href={getNavigationLinkToRentDetail(rentEntity)}
                className="name"
              > */}
              <div className="name">
                <span>{rentEntity.name}</span>
              </div>
              {/* </a> */}
            </div>

            {/* <span className="address-content">
              {house.wardName}, {house.districtName}
            </span> */}

            <Grid container>
              <Grid item xs={6}>
                <span className="content">
                  <i className="las la-home icon" />
                  <span>&nbsp;&nbsp;{rentEntity.rentType.name}</span>
                </span>
              </Grid>
              <Grid item xs={6}>
                <span className="content">
                  <i className="las la-expand-arrows-alt icon" />
                  <span>&nbsp;&nbsp; {rentEntity.area} m&#178;</span>
                </span>
              </Grid>
              <Grid item xs={6}>
                <span className="content">
                  {renderGender(
                    rentEntity.gender,
                    rentEntity.currentPeople,
                    rentEntity.maxPeople
                  )}
                </span>
              </Grid>
              <Grid item xs={12}>
                <div className="content">
                  <span style={{ whiteSpace: "pre-line" }}>
                    Mô tả:{<br />}
                    {rentEntity.description}
                  </span>
                </div>
              </Grid>
            </Grid>
          </div>
          <div style={{ marginLeft: 8 }}>
            <Divider />
          </div>
          <div className="card-footer">
            <div className="price-and-detail" style={{ height: "5vh" }}>
              <div className="price-container">
                <span className="price">
                  {numberWithCommas(rentEntity.price)} VNĐ
                </span>
                <span className="month">/tháng</span>
              </div>
              <Button
                variant="outlined"
                size="small"
                className="button"
                onClick={() => setToggleModal(true)}
              >
                Xem chi tiết
              </Button>
            </div>
          </div>
        </div>
      </div>

      <RentModal
        rentEntity={rentEntity}
        open={toggleModal}
        onClose={() => setToggleModal(false)}
      />
    </React.Fragment>
  );
};

export default RentOfHouseHorizontal;
