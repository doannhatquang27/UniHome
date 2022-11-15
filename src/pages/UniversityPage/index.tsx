import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import NotFound from "../../assets/images/notfound.png";
import AppBar from "../../components/AppBar";
import Footer from "../../components/Footer";
import CustomPagination from "../../components/utils/CustomPagination";
import { COLORS } from "../../constants/color";
import { GetHousesByUniversityDTO } from "../../dtos/universityDtos/GetHousesByUniversityDTO";
import IHouse from "../../interfaces/UniHouseApiInterfaces/IHouse";
import IUniversity from "../../interfaces/UniHouseApiInterfaces/IUniversity";
import {
  getAllUniversitiesAPI,
  getHousesByUniversityAPI,
} from "../../services/university-services";
import { convertNameToUrl } from "../../services/utils/navigation";
import { findUniFromUrlName } from "../../services/utils/university";
import { UniversityOptionProps } from "../HomePage";
import ContactDrawer from "../HomePage/components/ContactDrawer";
import HouseCard from "../HomePage/components/Main/HouseCard";
import UniList from "./components/UniList";
import "./index.scss";

const PAGE = 1;
const PAGESIZE = 12;

type Params = {
  uniName: string;
};

const UniversityPage = () => {
  const history = useHistory();
  const { uniName } = useParams<Params>();
  const [searchByNameValue, setSearchByNameValue] = useState("");
  const [houseList, setHouseList] = useState<IHouse[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectHouse, setSelectHouse] = useState<IHouse>();
  const [universityList, setUniversityList] = useState<IUniversity[]>([]);
  const [currentUni, setCurrentUni] = useState<IUniversity>();

  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(PAGE);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setLoading(true);
    setPage(value);
    window.scrollTo(0, 0);
  };

  // navigate đến trường đại học đầu tiên nếu chưa có trường được chọn
  const navigateToFirstUniversity = async () => {
    const result = await getAllUniversitiesAPI();
    if (result) {
      const firstUni = result[0];
      const convertedName = convertNameToUrl(firstUni.name);
      history.replace(`/university/${convertedName}`);
    }
  };

  const fetchUniversityList = async () => {
    const result = await getAllUniversitiesAPI();
    if (result) {
      setUniversityList(result);
    }
  };

  useEffect(() => {
    fetchUniversityList();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [uniName]);

  useEffect(() => {
    const fetchRentFromUniId = async (name: string) => {
      const university = await findUniFromUrlName(name);
      if (university) {
        setCurrentUni(university);
        const payload: GetHousesByUniversityDTO = {
          id: university.universityId,
          page: page,
          pageSize: PAGESIZE,
        };
        const result = await getHousesByUniversityAPI(payload);
        if (result) {
          setHouseList(result.houses);
          setTotalPage(result.totalPage);
        } else {
          setHouseList([]);
        }
      }
      setLoading(false);
    };

    if (uniName) {
      fetchRentFromUniId(uniName);
    } else {
      navigateToFirstUniversity();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uniName, page]);

  const handleOpenDrawer = (house: IHouse) => {
    setSelectHouse(house);
    setOpenDrawer(true);
  };

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

  const handleSearchRoom = (value: string) => {
    if (value !== "") {
      setSearchByNameValue(value);
      history.push(`/home?name=${value}`);
    }
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
        changeSearchRoom={(value: string) => handleSearchRoom(value)}
        changeSearchUni={(value: UniversityOptionProps) =>
          handleSearchUniversity(value)
        }
      />
      <UniList universityList={universityList} currentUniversity={currentUni} />

      <main className="uni-page">
        <div className="uni-page_rent-list-title">
          <span>Danh sách phòng</span>
          {currentUni && (
            <span className="uni-page_uni-name">&nbsp;{currentUni.name}</span>
          )}
        </div>
        <Grid container>
          <Grid item xs={12} sm={12}>
            {!isLoading && houseList.length === 0 ? (
              <div className="no_data">
                <div className="no_data_content">{NoSuitableData()}</div>
              </div>
            ) : null}

            <Grid container>
              {houseList.map((house) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  style={{ padding: 10 }}
                  key={house.houseId}
                >
                  <HouseCard
                    house={house}
                    openDrawer={() => handleOpenDrawer(house)}
                    displayDistance={true}
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

            {houseList.length !== 0 && (
              <div className="pagination">
                <CustomPagination
                  page={page}
                  handleChange={handleChangePage}
                  totalPage={totalPage}
                />
                <div className="pagination" />
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

export default UniversityPage;
