/* eslint-disable @typescript-eslint/no-unused-vars */
import { IconButton, InputBase, TextField } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { Autocomplete } from "@material-ui/lab";
import { ChangeEvent, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useHistory, useLocation } from "react-router-dom";
import { COLORS } from "../../../constants/color";
import { UniversityOptionProps } from "../../../pages/HomePage";
import { getAllUniversitiesAPI } from "../../../services/university-services";

enum SearchType {
  University,
  Room,
}

interface Props {
  searchByNameValue?: string;
  changeSearchRoom?: (value: string) => void;
  changeSearchUni?: (value: UniversityOptionProps) => void;
}

const SearchField: React.FC<Props> = ({
  searchByNameValue,
  changeSearchRoom,
  changeSearchUni,
}) => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();
  const nameQuery = query.get("name");
  let history = useHistory();
  const [seachValue, setSearchValue] = useState(nameQuery ? nameQuery : "");
  const [searchType, setSearchType] = useState(SearchType.Room);
  const [universityOptions, setUniversityOptions] = useState<
    UniversityOptionProps[]
  >([]);
  const [selectedUniversity, setSelectedUniversity] =
    useState<UniversityOptionProps | null>(null);

  const classes = useStyles();

  useEffect(() => {
    const fetchAllUniversities = async () => {
      const result = await getAllUniversitiesAPI();
      if (result) {
        const universityOptions = result.map((uni) => {
          return {
            value: uni.universityId,
            label: uni.name,
          };
        });
        setUniversityOptions(universityOptions);
      }
    };
    fetchAllUniversities();
  }, []);

  useEffect(() => {
    if (searchByNameValue) {
      setSearchValue(searchByNameValue);
    }
  }, [searchByNameValue]);

  const handleSearchButtonClick = () => {
    if (searchType === SearchType.University) {
      if (changeSearchUni && selectedUniversity !== null) {
        changeSearchUni(selectedUniversity);
      }
    } else {
      if (changeSearchRoom) {
        changeSearchRoom(seachValue);
      } else {
        history.push(`/home?name=${seachValue}`);
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && changeSearchRoom) {
      changeSearchRoom(seachValue);
    }
  };

  const handleChangeSearch = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSearchType(event.target.value as SearchType);
    setSearchValue("");
    setSelectedUniversity(null);
  };

  return (
    <div
      className={classes.search}
      style={{ display: "flex", flex: isMobile ? 5 : 1 }}
    >
      {/* <div
        style={{
          width: 110,
          borderTopLeftRadius: 25,
          borderBottomLeftRadius: 25,
          borderRight: `solid ${COLORS.appMainColor} 2px`,
        }}
      >
        <Select
          style={{ width: "100%", height: "100%" }}
          value={searchType}
          onChange={handleChangeSearch}
          disableUnderline
          classes={{ select: classes.selectSelect }}
        >
          <MenuItem value={SearchType.Room}>
            <span
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                color: COLORS.appMainColor,
              }}
            >
              <MeetingRoom style={{ color: COLORS.appMainColor }} />
              Phòng
            </span>
          </MenuItem>
          <MenuItem value={SearchType.University}>
            <span
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                color: COLORS.appMainColor,
              }}
            >
              <AccountBalance style={{ color: COLORS.appMainColor }} />
              Trường
            </span>
          </MenuItem>
        </Select>
      </div> */}
      {searchType === SearchType.Room ? (
        <InputBase
          placeholder="Tìm kiếm ..."
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          value={seachValue}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            if (event.target.value.length < 50) {
              setSearchValue(event.target.value);
            }
          }}
          onKeyPress={handleKeyPress}
        />
      ) : (
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          fullWidth
          style={{ height: 37, paddingRight: "calc(1em + 30px)" }}
          options={universityOptions.map((option) => option.label)}
          onChange={(event, newValue) =>
            setSelectedUniversity(
              universityOptions.find((uni) => uni.label === newValue)!
            )
          }
          renderInput={(params) => (
            <TextField
              {...params}
              style={{ paddingLeft: 8, height: "100%" }}
              classes={{ root: classes.inputRoot }}
              placeholder="Tìm kiếm ..."
              InputProps={{
                ...params.InputProps,
                style: { height: "100%", color: COLORS.appMainColor },
                type: "search",
              }}
            />
          )}
        />
      )}
      <IconButton
        className={classes.searchIcon}
        onClick={handleSearchButtonClick}
      >
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default SearchField;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: "relative",
      flexGrow: 1,
      borderRadius: 25,
      border: "2px solid",
      borderColor: COLORS.appMainColor,
      backgroundColor: "white",
      marginRight: isMobile ? 0 : theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: 20,
        width: "auto",
      },
    },
    searchIcon: {
      color: "white",
      backgroundColor: COLORS.appMainColor,
      borderRadius: 25,
      padding: "0 4.5px",
      height: "calc(100% - 4px)",
      position: "absolute",
      // pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      right: 0,
      margin: 2,
    },
    inputRoot: {
      color: COLORS.appMainColor,
      fontWeight: 300,
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 2),
      // vertical padding + font size from searchIcon
      paddingRight: `calc(1em + ${theme.spacing(1)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "35ch",
      },
    },
    selectSelect: {
      paddingLeft: 12,
    },
  })
);
