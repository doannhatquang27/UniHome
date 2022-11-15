import { Grid } from "@material-ui/core";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import AllowLocationAccess from "../../assets/images/allow-location-access.png";
import LoadingFailed from "../../assets/images/undraw_empty_re_opql.svg";
import NotFound from "../../assets/images/undraw_not_found_-60-pq.svg";
import AppBar from "../../components/AppBar";
import Footer from "../../components/Footer";
import CustomPagination from "../../components/utils/CustomPagination";
import SimpleBackdrop from "../../components/utils/ProgressBackdrop";
import { COLORS } from "../../constants/color";
import { GetHouseListDTO } from "../../dtos/houseDtos/GetHouseListDto";
import { FilterType } from "../../enums/EnumFilterType";
import { Gender } from "../../enums/EnumGender";
import { HouseStatusEnum } from "../../enums/HouseEnum";
import { RentEntityEnum } from "../../enums/RentEntityEnum";
import IHouse from "../../interfaces/UniHouseApiInterfaces/IHouse";
import {
  getAvailableHouseListAPI,
  getHouseListWithDistanceAPI,
} from "../../services/house-services";
import { convertNameToUrl } from "../../services/utils/navigation";
import ContactDrawer from "./components/ContactDrawer";
import FilterPanel from "./components/FilterPanel";
import FilterSideBar from "./components/FilterSideBar";
import HouseCard from "./components/Main/HouseCard";
import "./index.scss";

const PAGE = 1;
const MIN_PRICE = 0;
const MAX_PRICE = 30000000;
const MIN_AREA = 0;
const MAX_AREA = 1000;
const ORDER_BY = 1; //newest
const ORDER_TYPE = 1; // newest
const GENDER = Gender.all;
const PAGESIZE = 12;

type Params = {
  type: string;
};

export interface UniversityOptionProps {
  value: string;
  label: string;
}

interface Props {
  isSharingPage: boolean;
}

const HomePage: FC<Props> = ({ isSharingPage }) => {
  const history = useHistory();
  const { type } = useParams<Params>();
  const [searchByNameValue, setSearchByNameValue] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(PAGE);
  const [availableHouseList, setAvailableHouseList] = useState<IHouse[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [loadingFailed, setLoadingFailed] = useState(false);
  const [displayAccessLocation, setAccessLocation] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectHouse, setSelectHouse] = useState<IHouse | undefined>();
  const [startWaiting, setStartWaiting] = useState(false);
  const [currentFilterType, setCurrentFilterType] = useState(FilterType.custom);

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
  const genderQuery = query.get("gender");
  const nameQuery = query.get("name");
  const isSharingQuery = query.get("isSharing");

  const fetchRentEntiesByDistance = useCallback(
    async (position: GeolocationPosition) => {
      const result = await getHouseListWithDistanceAPI(
        position.coords.latitude,
        position.coords.longitude,
        page
      );
      if (result) {
        setAvailableHouseList(result.houses);
        setTotalPage(result.totalPage);
        setLoading(false);
        setAccessLocation(false);
      }
    },
    [page]
  );

  useEffect(() => {
    if (startWaiting) {
      const delay = setTimeout(() => {
        if (availableHouseList.length === 0 && isLoading) {
          setLoadingFailed(true);
          setLoading(false);
          setStartWaiting(false);
        }
      }, 30 * 1000);
      return () => clearTimeout(delay);
    }
  }, [availableHouseList.length, isLoading, startWaiting]);

  useEffect(() => {
    setStartWaiting(true);
  }, []);

  //Load Rent Entities Sort By Distance
  useEffect(() => {
    if (filterTypeQuery) {
      if (Number(filterTypeQuery) !== currentFilterType) {
        setPage(1);
        setCurrentFilterType(Number(filterTypeQuery));
      }
    }
    if (filterTypeQuery && Number(filterTypeQuery) === FilterType.nearMe) {
      setAccessLocation(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(fetchRentEntiesByDistance);
      }
    }
  }, [currentFilterType, fetchRentEntiesByDistance, filterTypeQuery]);

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
      const newDistrictId = districtIdQuery ? districtIdQuery : undefined;
      const newWardId = wardIdQuery ? wardIdQuery : undefined;
      const isSharing = isSharingQuery ? Boolean(isSharingQuery) : false;
      const newName = nameQuery ? nameQuery : "";

      const payload: GetHouseListDTO = {
        name: newName,
        pageNumber: page,
        pageSize: PAGESIZE,
        districtId: newDistrictId,
        wardId: newWardId,
        minPrice: minPriceNum,
        maxPrice: maxPriceNum,
        minArea: minAreaNum,
        maxArea: maxAreaNum,
        orderBy: orderByNum,
        orderType: orderTypeNum,
        gender: genderNum !== Gender.all ? genderNum : undefined,
        isSharing: isSharing,
        rentStatus: RentEntityEnum.Available,
        houseTypeId: getHouseTypeIdFromHouseTypeName(type),
        status: HouseStatusEnum.AVAILABEL,
      };

      const result = await getAvailableHouseListAPI(payload);
      if (result) {
        setAvailableHouseList(result.houses);
        setTotalPage(result.totalPage);
        setLoading(false);
        setLoadingFailed(false);
      } else {
        setAvailableHouseList([]);
        setTotalPage(1);
        setLoading(false);
        setLoadingFailed(false);
      }
    };

    if (!filterTypeQuery || Number(filterTypeQuery) !== FilterType.nearMe) {
      fetchRentEntitiesAsync();
    }
  }, [
    districtIdQuery,
    filterTypeQuery,
    genderQuery,
    isSharingPage,
    isSharingQuery,
    maxAreaQuery,
    maxPriceQuery,
    minAreaQuery,
    minPriceQuery,
    nameQuery,
    orderByQuery,
    orderTypeQuery,
    page,
    type,
    wardIdQuery,
  ]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setLoading(true);
    setPage(value);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (selectHouse) {
      setOpenDrawer(true);
    }
  }, [selectHouse]);

  const handleOpenDrawer = (house: IHouse) => {
    setSelectHouse(house);
  };

  const handleSearchUniversity = (
    selectedUniversity: UniversityOptionProps
  ) => {
    if (selectedUniversity !== null) {
      const uniName = convertNameToUrl(selectedUniversity.label);
      history.push(`/university/${uniName}`);
    }
  };

  return (
    <div>
      <AppBar
        searchByNameValue={searchByNameValue}
        changeSearchRoom={(value: string) => setSearchByNameValue(value)}
        changeSearchUni={(value: UniversityOptionProps) =>
          handleSearchUniversity(value)
        }
      />
      <main className="home-page">
        <Grid container>
          {/* filter panel */}
          <Grid item xs={2} className="filter-panel">
            <FilterPanel searchName={searchByNameValue} />
          </Grid>
          <Grid item xs={12} sm={10} style={{ padding: 10, marginTop: 10 }}>
            <div className="side-bar">
              <FilterSideBar>
                <FilterPanel searchName={searchByNameValue} />
              </FilterSideBar>
            </div>
            <SimpleBackdrop isLoading={isLoading} />

            {!isLoading &&
            !loadingFailed &&
            !displayAccessLocation &&
            availableHouseList.length === 0 ? (
              <div className="no_data">
                <div className="no_data_content">{renderNotFound()}</div>
              </div>
            ) : null}

            {!isLoading && loadingFailed && (
              <div className="no_data">{renderLoadingFailed()}</div>
            )}

            {displayAccessLocation && availableHouseList.length === 0 && (
              <div className="no_data">
                <div className="no_data_content">{AllowLocationToAccess()}</div>
              </div>
            )}

            {availableHouseList.length > 0 && (
              <span style={{ padding: 10, fontSize: 24, fontWeight: 600 }}>
                Danh sách nhà
              </span>
            )}

            {/* <br />
            <span style={{ padding: 10, fontSize: 20, fontWeight: 500 }}>
              Hiển thị {availableHouseList.length}
            </span> */}
            <Grid container>
              {availableHouseList.map((house) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  style={{ padding: 10 }}
                  key={house.houseId}
                >
                  <HouseCard
                    house={house}
                    filterType={filterTypeQuery}
                    openDrawer={() => handleOpenDrawer(house)}
                  />
                </Grid>
              ))}
            </Grid>
            {selectHouse && (
              <ContactDrawer
                open={openDrawer}
                setOpen={(newState) => {
                  setOpenDrawer(newState);
                  if (newState === false) {
                    setSelectHouse(undefined);
                  }
                }}
                houseId={selectHouse.houseId}
                bookingSlotList={selectHouse.bookingSlots}
                house={selectHouse}
              />
            )}

            {availableHouseList.length !== 0 && (
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

export default HomePage;

const renderNotFound = () => {
  return (
    <div className="home-page_empty-data">
      <img
        src={NotFound}
        alt="not found"
        className="home-page_empty-data_image"
      />
      <span>Không tìm thấy kết quả phù hợp</span>
    </div>
  );
};

const renderLoadingFailed = () => {
  return (
    <div className="home-page_empty-data">
      <img
        src={LoadingFailed}
        alt="loading failed"
        className="home-page_empty-data_image"
      />
      <span>Không tải được danh sách trọ</span>
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

const getHouseTypeIdFromHouseTypeName = (houseTypeName: string) => {
  const mappingHouseType: { id: string; name: string }[] = [
    {
      id: "8fb3b3be-2e11-47ca-9fa1-1b24f15ef903",
      name: "nha-pho",
    },
    {
      id: "32449128-4251-4e31-86a7-2a7bbfc4e318",
      name: "chung-cu",
    },
    {
      id: "b812b53f-b119-4ea9-a57b-504148c04b46",
      name: "khu-ktx",
    },
    {
      id: "a2d9e01b-5b56-40a0-ae61-58e8798d0e0e",
      name: "nha-tro",
    },
  ];

  const houseType = mappingHouseType.find(
    (type) => type.name === houseTypeName
  );
  if (houseType) {
    return houseType.id;
  }
  return undefined;
};
