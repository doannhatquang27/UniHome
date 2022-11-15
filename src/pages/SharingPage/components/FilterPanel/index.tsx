/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { COLORS } from "../../../../constants/color";
import { FilterType } from "../../../../enums/EnumFilterType";
import { Gender } from "../../../../enums/EnumGender";
import AddressSelect from "./AddressSelect";
import FilterTypeCheckbox from "./FilterTypeCheckbox";
import GenderCheckBox from "./GenderCheckBox";
import PriceSlider from "./PriceSlider";
import RentTypeCheckBox from "./RentTypeCheckBox";
import SortByCheckBox from "./SortByCheckbox";

enum OrderEnum {
  "price_asc",
  "price_desc",
  "area_asc",
  "area_desc",
}

enum OrderTypeEnum {
  "price",
  "area",
}

enum OrderByEnum {
  "asc",
  "desc",
}

const findOrderFromOrderByAndOrderType = (
  orderBy: string | null,
  orderType: string | null
) => {
  if (orderBy && orderType) {
    return Number(orderType) * 2 + Number(orderBy);
  } else {
    return undefined;
  }
};

interface Props {
  searchName: string;
}

const FilterPanel: React.FC<Props> = ({ searchName }) => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();
  const districtIdQuery = query.get("districtId");
  const filterTypeQuery = query.get("filterType");
  const wardIdQuery = query.get("wardId");
  const minPriceQuery = query.get("minPrice");
  const maxPriceQuery = query.get("maxPrice");
  const minAreaQuery = query.get("minArea");
  const maxAreaQuery = query.get("maxArea");
  const orderByQuery = query.get("orderBy");
  const orderTypeQuery = query.get("orderType");
  const genderQuery = query.get("gender");

  let history = useHistory();
  const { url } = useRouteMatch();
  const [filterType, setFilterType] = useState<FilterType>(
    filterTypeQuery ? Number(filterTypeQuery) : FilterType.custom
  );
  const [districtId, setDistrictId] = useState<string | null>(districtIdQuery);
  const [wardId, setWardId] = useState<string | null>(wardIdQuery);
  const [isSharing, setSharing] = useState<number | null>(1);
  const [minPrice, setMinPrice] = useState<number | undefined>(
    minPriceQuery ? Number(minPriceQuery) : undefined
  );
  const [maxPrice, setMaxPrice] = useState<number | undefined>(
    maxPriceQuery ? Number(maxPriceQuery) : undefined
  );
  const [minArea, setMinArea] = useState<number | undefined>(
    minAreaQuery ? Number(minAreaQuery) : undefined
  );
  const [maxArea, setMaxArea] = useState<number | undefined>(
    maxAreaQuery ? Number(maxAreaQuery) : undefined
  );
  const [order, setOrder] = useState<number | undefined>(
    findOrderFromOrderByAndOrderType(orderByQuery, orderTypeQuery)
  );
  const [gender, setGender] = useState<Gender | undefined>(
    genderQuery ? Number(genderQuery) : undefined
  );
  const [isDefault, setDefault] = useState(false);
  // const [orderBy, setOrderBy] = useState<number | undefined>(undefined);
  // const [orderType, setOrderType] = useState<number | undefined>(undefined);

  const page = query.get("page");

  const handleChangeFilterType = (value: FilterType) => {
    setFilterType(value);
  };

  const handleChangeDistrictId = (value: string | null) => {
    setDistrictId(value);
  };

  const handleChangeWardId = (value: string | null) => {
    setWardId(value);
  };
  const handleChangeMinMaxPrice = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  // const handleChangeMinMaxArea = (min: number, max: number) => {
  //   setMinArea(min);
  //   setMaxArea(max);
  // };

  const handleChangeOrder = (value: number) => {
    setOrder(value);
  };

  const handleChangeGender = (value: Gender) => {
    setGender(value);
  };

  const insertStringSymbol = (str: string) => {
    return str.includes("?") ? str + "&" : str + "?";
  };

  useEffect(() => {
    let newUrl = `${url}`;
    if (filterType === FilterType.nearMe) {
      newUrl = insertStringSymbol(newUrl);
      newUrl += `filterType=${filterType}`;
    } else {
      if (districtId) {
        newUrl = insertStringSymbol(newUrl);
        newUrl += `districtId=${districtId}`;
      }
      if (wardId) {
        newUrl = insertStringSymbol(newUrl);
        newUrl += `wardId=${wardId}`;
      }
      if (searchName) {
        newUrl = insertStringSymbol(newUrl);
        newUrl += `name=${searchName}`;
      }
      if (typeof minPrice === "number" && typeof maxPrice === "number") {
        newUrl = insertStringSymbol(newUrl);
        newUrl += `minPrice=${minPrice}&maxPrice=${maxPrice}`;
      }
      if (minArea && maxArea) {
        newUrl = insertStringSymbol(newUrl);
        newUrl += `minArea=${minArea}&maxArea=${maxArea}`;
      }
      if (gender) {
        newUrl = insertStringSymbol(newUrl);
        newUrl += `gender=${gender}`;
      }
      if (typeof order === "number") {
        newUrl = insertStringSymbol(newUrl);
        switch (order) {
          case OrderEnum.price_desc:
            newUrl += `orderBy=${OrderByEnum.desc}&orderType=${OrderTypeEnum.price}`;
            break;
          case OrderEnum.area_asc:
            newUrl += `orderBy=${OrderByEnum.asc}&orderType=${OrderTypeEnum.area}`;
            break;
          case OrderEnum.area_desc:
            newUrl += `orderBy=${OrderByEnum.desc}&orderType=${OrderTypeEnum.area}`;
            break;
          case OrderEnum.price_asc:
            newUrl += `orderBy=${OrderByEnum.asc}&orderType=${OrderTypeEnum.price}`;
            break;
        }
      }
      if (page) {
        newUrl = insertStringSymbol(newUrl);
        newUrl += `page=${page}`;
      }
    }
    history.push(newUrl);
  }, [
    filterType,
    gender,
    history,
    isSharing,
    maxArea,
    maxPrice,
    minArea,
    minPrice,
    order,
    page,
    url,
    districtId,
    wardId,
    searchName,
  ]);

  const handleDefaultChange = () => {
    setDistrictId(null);
    setWardId(null);
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setMinArea(undefined);
    setMaxArea(undefined);
    setOrder(undefined);
    setSharing(1);
    setGender(undefined);
    setDefault(true);
    setFilterType(FilterType.custom);
    history.push("/sharing");
  };

  return (
    <div
      style={{
        boxSizing: "border-box",
        borderRight: "1px solid #c7c7c7",
        padding: "20px 20px 20px 8px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{ width: "50%", textAlign: "center", alignItems: "center" }}
        >
          <Typography
            variant="h6"
            style={{
              float: "left",
              fontSize: 20,
              fontWeight: 600,
              color: "#42464d",
            }}
          >
            Bộ lọc
          </Typography>
          <Typography
            variant="h6"
            style={{
              float: "left",
              fontSize: 20,
              fontWeight: 600,
              color: "#42464d",
              marginLeft: "5px",
            }}
          >
            <i className="las la-filter"></i>
          </Typography>
        </div>
        <Button
          style={{
            color: COLORS.appMainColor,
            fontSize: 16,
            fontWeight: 300,
            textTransform: "none",
          }}
          onClick={handleDefaultChange}
        >
          xóa
        </Button>
      </div>

      <FilterTypeCheckbox
        handleChangeFilterType={handleChangeFilterType}
        isDefault={isDefault}
      />

      {filterType === FilterType.custom ? (
        <React.Fragment>
          <RentTypeCheckBox isDefault={isDefault} />
          <GenderCheckBox
            handleChangeGender={handleChangeGender}
            isDefault={isDefault}
          />
          <SortByCheckBox
            handleChangeOrder={handleChangeOrder}
            isDefault={isDefault}
          />
          <PriceSlider
            handleChangeMinMaxPrice={handleChangeMinMaxPrice}
            isDefault={isDefault}
            setDefaultFalse={() => setDefault(false)}
          />
          <AddressSelect
            handleChangeDistrictId={handleChangeDistrictId}
            handleChangeWardId={handleChangeWardId}
            isDefault={isDefault}
          />
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default FilterPanel;
