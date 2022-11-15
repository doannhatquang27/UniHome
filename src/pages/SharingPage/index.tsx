import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import AllowLocationAccess from "../../assets/images/allow-location-access.png";
import NotFound from "../../assets/images/notfound.png";
import AppBar from "../../components/AppBar";
import Footer from "../../components/Footer";
import CustomPagination from "../../components/utils/CustomPagination";
import SimpleBackdrop from "../../components/utils/ProgressBackdrop";
import { COLORS } from "../../constants/color";
import { FilterType } from "../../enums/EnumFilterType";
import { Gender } from "../../enums/EnumGender";
import IRentEntity from "../../interfaces/UniHouseApiInterfaces/IRentEntity";
import {
  findAvailableRentEntitiesAPI,
  loadRentEntitiesByDistanceAPI,
} from "../../services/rent-services";
// import ContactDrawer from "./components/ContactDrawer";
import FilterPanel from "./components/FilterPanel";
import FilterSideBar from "./components/FilterSideBar";
import HouseCard from "./components/HouseCard";
import "./index.scss";

// const TYPE = null;
const PAGE = 1;
const MIN_PRICE = 0;
const MAX_PRICE = 30000000;
const MIN_AREA = 0;
const MAX_AREA = 1000;
const ORDER_BY = 0;
const ORDER_TYPE = 0;
const GENDER = Gender.all;
const PAGESIZE = 12;

type Params = {
  type: string;
};

const MappingRentType = [
  { url: "can-ho", typeName: "apartment" },
  { url: "sleepbox", typeName: "sleepbox" },
  { url: "nha-nguyen-can", typeName: "fullhouse" },
  { url: "phong-tro", typeName: "default" },
];

const convertFromUrlNameToTypeName = (urlName: string) => {
  return MappingRentType.find((type) => type.url === urlName)?.typeName;
};

const fetchRentEntities = async (
  type: string | null,
  page: number,
  minPrice: number,
  maxPrice: number,
  minArea: number,
  maxArea: number,
  orderBy: number,
  orderType: number,
  gender: number,
  districtId?: string,
  wardId?: string,
  isSharing?: number,
  name?: string
) => {
  let requestType: string | null = null;
  if (type) {
    const requestTypeConverted = convertFromUrlNameToTypeName(type);
    if (requestTypeConverted) {
      requestType = requestTypeConverted;
    }
  }
  const result = await findAvailableRentEntitiesAPI(
    requestType,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    orderBy,
    orderType,
    gender,
    page,
    PAGESIZE,
    districtId,
    wardId,
    isSharing,
    name
  );
  return result;
};

const SharingPage = () => {
  const { type } = useParams<Params>();
  const [searchByNameValue, setSearchByNameValue] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(PAGE);
  const [availableRentEntities, setRentEntities] = useState<IRentEntity[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [displayAccessLocation, setAccessLocation] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedRentId, setSelectedRentId] = useState("");

  // Get min, max in url
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();

  const filterTypeQuery = query.get("filterType");
  const districtIdQuery = query.get("districtId");
  const wardIdQuery = query.get("wardId");
  const minPriceQuery = query.get("minPrice");
  const maxPriceQuery = query.get("maxPrice");
  const minAreaQuery = query.get("minArea");
  const maxAreaQuery = query.get("maxArea");
  const orderByQuery = query.get("orderBy");
  const orderTypeQuery = query.get("orderType");
  const isSharingQuery = query.get("isSharing");
  const genderQuery = query.get("gender");
  const nameQuery = query.get("name");

  const fetchRentEntiesByDistanceCallBack = async (
    position: GeolocationPosition
  ) => {
    const result = await loadRentEntitiesByDistanceAPI(
      position.coords.latitude,
      position.coords.longitude,
      12
    );
    if (result) {
      setRentEntities(result);
      setLoading(false);
      setAccessLocation(false);
    }
  };

  // const fetchDefault = async () => {
  //   setLoading(true);
  //   const result = await fetchRentEntities(
  //     TYPE,
  //     PAGE,
  //     MIN_PRICE,
  //     MAX_PRICE,
  //     MIN_AREA,
  //     MAX_AREA,
  //     ORDER_BY,
  //     ORDER_TYPE,
  //     GENDER
  //   );
  //   if (result) {
  //     setRentEntities(result.rentEntities);
  //   }
  //   setLoading(false);
  // };

  useEffect(() => {
    if (nameQuery) {
      setSearchByNameValue(nameQuery);
    }
  }, [nameQuery]);

  // Load Rent Entities Sort By Distance
  useEffect(() => {
    if (filterTypeQuery && Number(filterTypeQuery) === FilterType.nearMe) {
      setAccessLocation(true);
      setRentEntities([]);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          fetchRentEntiesByDistanceCallBack
        );
      }
    }
  }, [filterTypeQuery]);

  // Load All Rent Entity When Filter Change Change
  useEffect(() => {
    const fetchRentEntitiesAsync = async () => {
      const minPriceNum = minPriceQuery ? Number(minPriceQuery) : MIN_PRICE;
      const maxPriceNum = maxPriceQuery ? Number(maxPriceQuery) : MAX_PRICE;
      const minAreaNum = minAreaQuery ? Number(minAreaQuery) : MIN_AREA;
      const maxAreaNum = maxAreaQuery ? Number(maxAreaQuery) : MAX_AREA;
      const orderByNum = orderByQuery ? Number(orderByQuery) : ORDER_BY;
      const orderTypeNum = orderTypeQuery ? Number(orderTypeQuery) : ORDER_TYPE;
      const genderNum = genderQuery ? Number(genderQuery) : GENDER;
      const isSharingNum = 1;
      const newDistrictId = districtIdQuery ? districtIdQuery : undefined;
      const newWardId = wardIdQuery ? wardIdQuery : undefined;
      const name = nameQuery || undefined;

      const result = await fetchRentEntities(
        type,
        page,
        minPriceNum,
        maxPriceNum,
        minAreaNum,
        maxAreaNum,
        orderByNum,
        orderTypeNum,
        genderNum,
        newDistrictId,
        newWardId,
        isSharingNum,
        name
      );
      if (result) {
        setRentEntities(result.rentEntities);
        setTotalPage(result.pageCount);
        setLoading(false);
      }
    };
    if (!filterTypeQuery || Number(filterTypeQuery) !== FilterType.nearMe) {
      fetchRentEntitiesAsync();
    }
  }, [
    filterTypeQuery,
    genderQuery,
    maxAreaQuery,
    maxPriceQuery,
    minAreaQuery,
    minPriceQuery,
    orderByQuery,
    orderTypeQuery,
    isSharingQuery,
    page,
    type,
    districtIdQuery,
    wardIdQuery,
    nameQuery,
  ]);

  const NoSuitableData = () => {
    return (
      <div>
        <p
          style={{ color: COLORS.appMainColor }}
          className="no_data_content__text"
        >
          Không có kết quả phù hợp
        </p>
        <img src={NotFound} alt="not found" />
      </div>
    );
  };

  const AllowLocationToAccess = () => {
    return (
      <div>
        <p
          style={{ color: COLORS.appMainColor }}
          className="no_data_content__text"
        >
          Cho phép truy cập vị trí để nhận kết quả chính xác
        </p>
        <img
          src={AllowLocationAccess}
          alt="Cho phép truy cập vị trí để nhận kết quả chính xác"
          width={100}
        />
      </div>
    );
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setLoading(true);
    setPage(value);
    window.scrollTo(0, 0);
  };

  const handleOpenDrawer = (rentEntityId: string) => {
    setSelectedRentId(rentEntityId);
    setOpenDrawer(true);
  };

  return (
    <div>
      <AppBar
        searchByNameValue={searchByNameValue}
        changeSearchRoom={(value: string) => setSearchByNameValue(value)}
      />
      <main className="home-page">
        <Grid container>
          {/* filter panel */}
          <Grid item xs={2} className="filter-panel">
            <FilterPanel searchName={searchByNameValue} />
          </Grid>
          <Grid item xs={12} sm={10} style={{ padding: 10 }}>
            <div className="side-bar">
              <FilterSideBar>
                <FilterPanel searchName={searchByNameValue} />
              </FilterSideBar>
            </div>
            <SimpleBackdrop isLoading={isLoading} />

            {!isLoading &&
            !displayAccessLocation &&
            availableRentEntities.length === 0 ? (
              <div className="no_data">
                <div className="no_data_content">{NoSuitableData()}</div>
              </div>
            ) : null}

            {displayAccessLocation && availableRentEntities.length === 0 && (
              <div className="no_data">
                <div className="no_data_content">{AllowLocationToAccess()}</div>
              </div>
            )}

            <Grid container>
              {availableRentEntities.map((rentEntity) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  style={{ padding: 10 }}
                  key={rentEntity.rentEntityId}
                >
                  <HouseCard
                    key={rentEntity.rentEntityId}
                    rentEntity={rentEntity}
                    filterType={filterTypeQuery}
                    openDrawer={() => handleOpenDrawer(rentEntity.rentEntityId)}
                  />
                </Grid>
              ))}
            </Grid>
            {/* <ContactDrawer
              open={openDrawer}
              setOpen={(newState) => setOpenDrawer(newState)}
              rentEntityId={selectedRentId}
            /> */}
            {availableRentEntities.length !== 0 &&
              (!filterTypeQuery ||
                Number(filterTypeQuery) !== FilterType.nearMe) && (
                <div className="pagination">
                  <CustomPagination
                    page={page}
                    handleChange={handleChangePage}
                    totalPage={totalPage}
                  />
                </div>
              )}
          </Grid>
        </Grid>
      </main>
      <div className="footer-component">
        <Footer />
      </div>
    </div>
  );
};

export default SharingPage;
