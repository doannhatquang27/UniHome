import { Button, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { FilterType } from "../../../../enums/EnumFilterType";
import { Gender } from "../../../../enums/EnumGender";
import AddressSelect from "./AddressSelect";
import FilterTypeCheckbox from "./FilterTypeCheckbox";
import GenderCheckBox from "./GenderCheckBox";
import "./index.scss";
import ISharingSwitch from "./IsSharingSwitch";
// import MaxPeopleTextField from "./MaxPeopleTextField";
import PriceSlider from "./PriceSlider";
import RentTypeCheckBox from "./RentTypeCheckBox";
import SortByCheckBox from "./SortByCheckbox";

enum OrderEnum {
  "name_asc",
  "name_desc",
  "date_asc",
  "date_desc",
}

enum OrderByEnum {
  "name",
  "date",
}

enum OrderTypeEnum {
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
  const maxPeopleQuery = query.get("maxPeople");
  const nameQuery = query.get("name");
  // const isSharingQuery = query.get("isSharing");

  let history = useHistory();
  const { url } = useRouteMatch();
  const [filterType, setFilterType] = useState<FilterType>(
    filterTypeQuery ? Number(filterTypeQuery) : FilterType.custom
  );
  const [districtId, setDistrictId] = useState<string | null>(districtIdQuery);
  const [wardId, setWardId] = useState<string | null>(wardIdQuery);
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
  const [maxPeople, setMaxPeople] = useState<number | undefined>(
    maxPeopleQuery ? Number(maxPeopleQuery) : undefined
  );
  const [name, setName] = useState<string>(nameQuery ? nameQuery : "");

  const [houseTypeFilter, setHouseTypeFilter] = useState<string>();

  const [isSharing, setSharing] = useState(false);
  const [isDefault, setDefault] = useState(false);

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

  const handleChangeSharing = (value: boolean) => {
    setSharing(value);
  };

  // const handleChangeMaxPeole = (maxPeople: number) => {
  //   setMaxPeople(maxPeople);
  // };

  const handleChangeOrder = (value: number) => {
    setOrder(value);
  };

  const handleChangeGender = (value: Gender) => {
    setGender(value);
  };

  const handleChangeHouseTypeFilter = (value: string | undefined) => {
    setHouseTypeFilter(value);
  };

  const insertStringSymbol = (str: string) => {
    return str.includes("?") ? str + "&" : str + "?";
  };

  useEffect(() => {
    let newUrl = `${url}`;

    if (houseTypeFilter) {
      newUrl = `/type/${houseTypeFilter}`;
    }

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
      if (maxPeople) {
        newUrl = insertStringSymbol(newUrl);
        newUrl += `maxPeople=${maxPeople}`;
      }
      if (name) {
        newUrl = insertStringSymbol(newUrl);
        newUrl += `name=${name}`;
      }
      if (typeof order === "number") {
        newUrl = insertStringSymbol(newUrl);
        switch (order) {
          case OrderEnum.name_asc:
            newUrl += `orderType=${OrderTypeEnum.asc}&orderBy=${OrderByEnum.name}`;
            break;
          case OrderEnum.name_desc:
            newUrl += `orderType=${OrderTypeEnum.desc}&orderBy=${OrderByEnum.name}`;
            break;
          case OrderEnum.date_asc:
            newUrl += `orderType=${OrderTypeEnum.asc}&orderBy=${OrderByEnum.date}`;
            break;
          case OrderEnum.date_desc:
            newUrl += `orderType=${OrderTypeEnum.desc}&orderBy=${OrderByEnum.date}`;
            break;
        }
      }
      if (typeof isSharing === "boolean" && isSharing === true) {
        newUrl = insertStringSymbol(newUrl);
        newUrl += `isSharing=${true}`;
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
    maxPeople,
    isSharing,
    name,
    houseTypeFilter,
  ]);

  const handleDefaultChange = () => {
    setDistrictId(null);
    setWardId(null);
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setMinArea(undefined);
    setMaxArea(undefined);
    setOrder(undefined);
    setGender(undefined);
    setMaxPeople(undefined);
    setDefault(true);
    setFilterType(FilterType.custom);
    setName("");
    history.push("/home");
  };

  return (
    <div className="filter-panel-container">
      <div className="header">
        <div className="label">
          <Typography variant="h6" className="name">
            Bộ lọc
          </Typography>
          <Typography variant="h6" className="icon">
            <i className="las la-filter"></i>
          </Typography>
        </div>
        <Button className="button" onClick={handleDefaultChange}>
          xóa
        </Button>
      </div>

      <FilterTypeCheckbox
        handleChangeFilterType={handleChangeFilterType}
        isDefault={isDefault}
      />

      {filterType === FilterType.custom ? (
        <React.Fragment>
          <ISharingSwitch
            setSelectSharing={handleChangeSharing}
            isDefault={isDefault}
          />

          <PriceSlider
            handleChangeMinMaxPrice={handleChangeMinMaxPrice}
            isDefault={isDefault}
            setDefaultFalse={() => setDefault(false)}
          />

          <RentTypeCheckBox
            isDefault={isDefault}
            handleChangeHouseType={handleChangeHouseTypeFilter}
          />
          {/* <UniversitySelect /> */}
          <GenderCheckBox
            handleChangeGender={handleChangeGender}
            isDefault={isDefault}
          />
          {/* <MaxPeopleTextField
            handleChangeMaxPeople={handleChangeMaxPeole}
            isDefault={isDefault}
          /> */}
          <SortByCheckBox
            handleChangeOrder={handleChangeOrder}
            isDefault={isDefault}
          />
          {/* <PriceSlider
            handleChangeMinMaxPrice={handleChangeMinMaxPrice}
            isDefault={isDefault}
            setDefaultFalse={() => setDefault(false)}
          /> */}
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
