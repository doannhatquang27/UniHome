import { Button, Divider } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { GetHouseListDTO } from "../../../../dtos/houseDtos/GetHouseListDto";
import IHouse from "../../../../interfaces/UniHouseApiInterfaces/IHouse";
import { getAvailableHouseListAPI } from "../../../../services/house-services";
import HouseItem from "../HouseItem";
import "./index.scss";

const renderSkeleton = () => {
  const SKELETON_NUMBER = 3;
  return (
    <React.Fragment>
      {[...Array(SKELETON_NUMBER)].map((_, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            margin: 8,
            border: "1px solid #e6e6e6",
            borderRadius: 4,
          }}
        >
          <Skeleton
            animation="wave"
            height={150}
            style={{ display: "flex", flex: 1, transform: "none" }}
          />
          <div
            style={{
              display: "flex",
              flex: 2,
              flexDirection: "column",
              justifyContent: "flex-start",
              padding: 16,
            }}
          >
            <Skeleton animation="wave" style={{ display: "flex", flex: 2 }} />
            <Skeleton animation="wave" style={{ display: "flex", flex: 1 }} />
            <Skeleton animation="wave" style={{ display: "flex", flex: 1 }} />
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

interface Props {
  setLoadingFailed: () => void;
}

const HouseList: React.FC<Props> = ({ setLoadingFailed }) => {
  const history = useHistory();
  const [houseList, setHouseList] = useState<IHouse[]>([]);
  const [startWaiting, setStartWaiting] = useState(false);

  useEffect(() => {
    if (startWaiting) {
      const delay = setTimeout(() => {
        if (houseList.length === 0) {
          setLoadingFailed();
          setStartWaiting(false);
        }
      }, 30 * 1000);
      return () => clearTimeout(delay);
    }
  }, [houseList.length, setLoadingFailed, startWaiting]);

  useEffect(() => {
    const fetchRent = async () => {
      const payload: GetHouseListDTO = {
        pageNumber: 1,
        pageSize: 10,
        name: "",
        status: 1,
        rentStatus: 1,
      };
      const result = await getAvailableHouseListAPI(payload);
      if (result) {
        setHouseList(result.houses);
      }
    };
    setStartWaiting(true);
    fetchRent();
  }, []);

  const handleViewAll = () => {
    history.push("/home");
  };

  return (
    <div className="rent-entity-list">
      <span className="rent-entity-list_title">Phòng mới nhất</span>
      <div className="list">
        {houseList.map((house, index) => (
          <React.Fragment key={index}>
            <HouseItem key={house.houseId} house={house} />
            <Divider />
          </React.Fragment>
        ))}
      </div>

      {houseList.length === 0 && renderSkeleton()}
      <Button
        variant="contained"
        onClick={handleViewAll}
        className="all-button"
      >
        Xem tất cả
      </Button>
    </div>
  );
};

export default HouseList;
