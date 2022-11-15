import { Button } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import PlaceHolderImage from "../../../../assets/images/PlaceHolderImage.svg";
import { COLORS } from "../../../../constants/color";
import { GetHouseListDTO } from "../../../../dtos/houseDtos/GetHouseListDto";
import IHouse from "../../../../interfaces/UniHouseApiInterfaces/IHouse";
import { getAvailableHouseListAPI } from "../../../../services/house-services";
import { getNavigationLinkToHouseDetail } from "../../../../services/utils/navigation";
import ContactDrawer from "../../../HomePage/components/ContactDrawer";
import { HouseTypeEnum } from "../../../HomePage/components/Main/HouseCard";
import "./index.scss";

const renderSkeleton = () => {
  const SKELETON_NUMBER = 3;
  return (
    <React.Fragment>
      {[...Array(SKELETON_NUMBER)].map((_, i) => (
        <div key={i} className="skeleton">
          <div className="skeleton_part1">
            <Skeleton
              animation="wave"
              height={150}
              className="skeleton_part1_image"
            />
            <div className="skeleton_part1_content">
              <Skeleton
                animation="wave"
                className="skeleton_part1_content_item1"
              />
              <Skeleton
                animation="wave"
                className="skeleton_part1_content_item2"
              />
              <Skeleton
                animation="wave"
                className="skeleton_part1_content_item2"
              />
            </div>
          </div>
          <div className="skeleton_part2">
            <Skeleton
              animation="wave"
              height={100}
              className="skeleton_part2_item"
            />
          </div>
          <div className="skeleton_part3">
            <Skeleton animation="wave" className="skeleton_part3_item" />
            <Skeleton animation="wave" className="skeleton_part3_item" />
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

const SharingRoomList = () => {
  const [sharingRoomList, setSharingRoomList] = useState<IHouse[]>([]);
  const [selectHouse, setSelectedHouse] = useState<IHouse>();
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    if (selectHouse) {
      setOpenDrawer(true);
    }
  }, [selectHouse]);

  useEffect(() => {
    const fetchData = async () => {
      const payload: GetHouseListDTO = {
        pageNumber: 1,
        pageSize: 3,
        status: 1,
        rentStatus: 1,
        includeRenType: 1,
        name: "",
      };
      const result = await getAvailableHouseListAPI(payload);
      if (result) {
        setSharingRoomList(result.houses);
      }
    };
    fetchData();
  }, []);

  const convertToFloat = (num: number) => {
    const convertedNum = num / 1000000;
    return Number.isInteger(convertedNum)
      ? Math.floor(convertedNum)
      : convertedNum.toFixed(1);
  };

  return (
    <React.Fragment>
      <div className="sharing-room-list">
        <span className="sharing-room-list_title">Nhà nguyên căn</span>
        <div style={{ marginTop: 23 }}>
          {sharingRoomList.length === 0 && renderSkeleton()}
          {sharingRoomList.map((house) => (
            <div key={house.houseId} className="sharing-room">
              <a href={getNavigationLinkToHouseDetail(house)}>
                <img
                  src={house.image}
                  alt={house.name}
                  width="100%"
                  height="150px"
                  className="room-infor_image"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = PlaceHolderImage;
                  }}
                />
              </a>
              <div className="room-infor_infor">
                <span className="room-name">{house.name}</span>
                <span className="address">
                  {house.wardName}, {house.districtName}
                </span>
                <span className="address">
                  {house.houseTypeId === HouseTypeEnum.Apartment ? (
                    <i
                      className="las la-building icon-small icon"
                      style={{ color: COLORS.appMainColor }}
                    />
                  ) : (
                    <i
                      className="las la-home icon"
                      style={{ color: COLORS.appMainColor }}
                    />
                  )}
                  &nbsp;{house.houseTypeName}
                </span>
              </div>
              {/* <div style={{ margin: "0 8px" }}>
              <Divider />
            </div> */}
              <div className="card-footer">
                <span className="price-section">
                  <span className="price">
                    {convertToFloat(house.minPrice)} tr
                  </span>
                  <span className="month">/tháng</span>
                </span>
                <Button
                  variant="contained"
                  className="button"
                  onClick={() => setSelectedHouse(house)}
                >
                  <i className="las la-comments"></i>&nbsp; Đặt hẹn
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectHouse && (
        <ContactDrawer
          open={openDrawer}
          setOpen={(newState) => {
            setOpenDrawer(newState);
            if (newState === false) {
              setSelectedHouse(undefined);
            }
          }}
          houseId={selectHouse.houseId}
          bookingSlotList={selectHouse.bookingSlots}
          house={selectHouse}
        />
      )}
    </React.Fragment>
  );
};

export default SharingRoomList;
