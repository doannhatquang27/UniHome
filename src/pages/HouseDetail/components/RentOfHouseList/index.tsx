import {
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Theme,
} from "@material-ui/core";
import React, { FC, useEffect, useState } from "react";
import IHouse from "../../../../interfaces/UniHouseApiInterfaces/IHouse";
import IRentEntity from "../../../../interfaces/UniHouseApiInterfaces/IRentEntity";
import { getRentListOfOneHouseByHouseIdAPI } from "../../../../services/rent-services";
import "./index.scss";
import RentOfHouseHorizontal from "./RentOfHouseHorizontal";

interface Props {
  house: IHouse;
}

// const responsive = {
//   superLargeDesktop: {
//     // the naming can be any, depends on you.
//     breakpoint: { max: 4000, min: 3000 },
//     items: 5,
//   },
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 4,
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 464 },
//     items: 2,
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 1,
//   },
// };

const captializeName = (name: string) => {
  const words = name.split(" ");
  for (let i = 0; i < words.length; i++) {
    if (words[i] && words[i].length > 1) {
      words[i] = words[i][0].toUpperCase() + words[i].substring(1) + " ";
    }
  }
  return words;
};

const RentOfHouseList: FC<Props> = ({ house }) => {
  const classes = useStyles();
  const [rentOfHouseList, setRentOfHouseList] = useState<IRentEntity[]>([]);
  const [selectedRentType, setSelectedRentType] = useState("All");
  const [selectedRentPrice, setSelectedRentPrice] = useState("ASC");
  const [key, setKey] = useState(0);

  useEffect(() => {
    const getRentListOfCurrentHouse = async () => {
      const rentTypeId = selectedRentType !== "All" ? selectedRentType : null;
      const orderBy = 3; // Price
      const orderType = selectedRentPrice === "ASC" ? 0 : 1;
      const result = await getRentListOfOneHouseByHouseIdAPI(
        house.houseId,
        rentTypeId,
        orderBy,
        orderType
      );
      if (result) {
        setRentOfHouseList(result.rentEntities);
      } else {
        setRentOfHouseList([]);
      }
    };

    getRentListOfCurrentHouse();
    setKey(key + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [house, selectedRentPrice, selectedRentType]);

  const handleChangeType = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedRentType(event.target.value as string);
  };

  const handleChangePrice = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedRentPrice(event.target.value as string);
  };

  return (
    <React.Fragment>
      {/* <Carousel
        responsive={responsive}
        renderButtonGroupOutside={true}
        containerClass={classes.carousel}
      > */}
      <div className="rent-filter">
        <span className="title title_remove-margin">Danh sách phòng</span>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel>Loại hình thuê</InputLabel>
            <Select value={selectedRentType} onChange={handleChangeType}>
              <MenuItem value={"All"}>Tất cả</MenuItem>
              {house.rentTypes.map((item) => (
                <MenuItem value={item.rentTypeId}>
                  {captializeName(item.name.substring(5))}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Sắp xếp giá</InputLabel>
            <Select value={selectedRentPrice} onChange={handleChangePrice}>
              <MenuItem value={"ASC"}>Tăng dần</MenuItem>
              <MenuItem value={"DESC"}>Giảm dần</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div key={key}>
        {rentOfHouseList.map((item, index) => (
          <div key={index} className={classes.item}>
            <RentOfHouseHorizontal rentEntity={item} />
          </div>
        ))}
      </div>

      {/* </Carousel> */}
    </React.Fragment>
  );
};

export default RentOfHouseList;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    carousel: {
      "& > .react-multiple-carousel__arrow--left": {
        left: 0,
      },
      "& > .react-multiple-carousel__arrow--right": {
        right: 0,
      },
    },
    item: {
      padding: 7,
      height: "100%",
      boxSizing: "border-box",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);
