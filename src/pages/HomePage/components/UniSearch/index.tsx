import { IconButton, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAllUniversitiesAPI } from "../../../../services/university-services";
import { convertNameToUrl } from "../../../../services/utils/navigation";

interface OptionProps {
  value: string;
  label: string;
}

const UniSearch = () => {
  const history = useHistory();
  const [universityOptions, setUniversityOptions] = useState<OptionProps[]>([]);
  const [selectedUniversity, setSelectedUniversity] =
    useState<OptionProps | null>(null);

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

  // const handleChangeUniversity = (data: any, actionMeta: any) => {
  //   if (data) {
  //     setSelectedUniversity(data);
  //     const uniName = convertNameToUrl((data as OptionProps).label);
  //     history.push(`/university/${uniName}`);
  //   }
  //   if (actionMeta.action === "clear") {
  //     setSelectedUniversity(null);
  //   }
  // };

  const clickToNavigate = () => {
    if (selectedUniversity !== null) {
      const uniName = convertNameToUrl(selectedUniversity.label);
      history.push(`/university/${uniName}`);
    }
  };

  return (
    <div>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={universityOptions.map((option) => option.label)}
        onChange={(event, newValue) =>
          setSelectedUniversity(
            universityOptions.find((uni) => uni.label === newValue)!
          )
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            size="small"
            InputProps={{
              ...params.InputProps,
              type: "search",
              style: { backgroundColor: "#ffffffb8" },
              endAdornment: (
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={clickToNavigate}
                  onMouseDown={() => null}
                  edge="end"
                  size="small"
                >
                  <Search fontSize="small" />
                </IconButton>
              ),
            }}
          />
        )}
      />
    </div>
  );
};

export default UniSearch;
