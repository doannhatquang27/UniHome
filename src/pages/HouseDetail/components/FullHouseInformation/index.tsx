import { Divider } from "@material-ui/core";
import React, { FC } from "react";
import { Gender } from "../../../../enums/EnumGender";
import IRentEntity from "../../../../interfaces/UniHouseApiInterfaces/IRentEntity";
import HouseFacitityAndService from "../HouseFacilitiesAndServices";

interface Props {
  rentEntity: IRentEntity;
}

const FullHouseInformation: FC<Props> = ({ rentEntity }) => {
  return (
    <React.Fragment>
      <div className="rent-modal-card_section-block rent-modal-card_rent-infor">
        <span className="title">Thông tin phòng</span>

        <div className="content">
          <span className="label">Đối tượng: </span>
          <span>{getGenderAllowString(rentEntity.gender)}</span>
        </div>

        <div className="content">
          <span className="label">Tối đa: </span>
          <span>{rentEntity.maxPeople} người</span>
        </div>

        <div className="content">
          <span className="label">Số thành viên hiện tại: </span>
          <span>
            {rentEntity.currentPeople > 0
              ? rentEntity.currentPeople + " người"
              : 0}
          </span>
        </div>

        <div className="content">
          <span className="label">Diện tích: </span>
          <span>{rentEntity.area} m&#178;</span>
        </div>

        <div className="content">
          <span className="label">Đặt cọc: </span>
          <span>
            {rentEntity?.depositPrice
              ? numberWithCommas(rentEntity?.depositPrice)
              : ""}{" "}
            VNĐ
          </span>
        </div>
      </div>

      <div style={{ padding: "0 56px" }}>
        <Divider />
      </div>

      {/* Tiện ích */}
      <div className="rent-modal-card_section-block">
        <HouseFacitityAndService
          rentFacilities={rentEntity.rentFacility}
          rentServives={rentEntity.rentService}
        />
      </div>

      <div style={{ padding: "0 56px" }}>
        <Divider />
      </div>

      {/* Description */}
      <div className="rent-modal-card_section-block">
        <span className="title">Mô tả:</span>
        <span className="content" style={{ whiteSpace: "pre-line" }}>
          {rentEntity.description}
        </span>
      </div>
    </React.Fragment>
  );
};

export default FullHouseInformation;

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

const numberWithCommas = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
