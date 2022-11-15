import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Modal,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { Gender } from "../../../../enums/EnumGender";
import IRentEntity from "../../../../interfaces/UniHouseApiInterfaces/IRentEntity";
import HouseFacitityAndService from "../HouseFacilitiesAndServices";
import ImageGrid from "../ImageGrid";
import "./index.scss";

type Params = {
  id: string;
};
interface Props {
  rentEntity: IRentEntity;
  open: boolean;
  onClose: () => void;
}

const RentModal: FC<Props> = ({ rentEntity, open, onClose }) => {
  let { id } = useParams<Params>();
  return (
    <Modal open={open} onClose={onClose}>
      <Card className="rent-modal-card">
        <CardHeader
          title={`Thông tin phòng: ${rentEntity.name} `}
          action={
            <IconButton aria-label="settings" onClick={onClose}>
              <Close className="card-header_icon" />
            </IconButton>
          }
          className="card-header"
        />
        <CardContent className="card-content">
          <ImageGrid imageList={rentEntity.image.split(";")} />

          {/* Thông tin phòng */}
          <div className="rent-modal-card_section-block rent-modal-card_rent-infor">
            {rentEntity && renderRoomInfor(rentEntity)}
          </div>

          <div style={{ padding: "0 28px" }}>
            <Divider />
          </div>

          {/* Tiện ích */}
          <div className="rent-modal-card_section-block">
            {rentEntity ? (
              <React.Fragment>
                <HouseFacitityAndService
                  rentFacilities={rentEntity.rentFacility}
                  rentServives={rentEntity.rentService}
                />
              </React.Fragment>
            ) : null}
          </div>

          <div style={{ padding: "0 28px" }}>
            <Divider />
          </div>

          {/* Description */}
          <div className="rent-modal-card_section-block">
            <span className="title">Mô tả:</span>
            <span className="content" style={{ whiteSpace: "pre-line" }}>
              {rentEntity?.description}
            </span>
          </div>
        </CardContent>
      </Card>
    </Modal>
  );
};

export function renderRoomInfor(rentEntity: IRentEntity) {
  return (
    <React.Fragment>
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
        <span className="label">Giá phòng: </span>
        <span>{numberWithCommas(rentEntity.price)} VNĐ / tháng</span>
      </div>

      <div className="content">
        <span className="label">Đặt cọc: </span>
        <span>
          {rentEntity?.depositPrice
            ? numberWithCommas(rentEntity?.depositPrice)
            : ""}{" "}
          VNĐ
        </span>
        {/* <PaymentComponent rentEntity={rentEntity} rentEntityQuery={id} /> */}
      </div>
    </React.Fragment>
  );
}

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

export default RentModal;
