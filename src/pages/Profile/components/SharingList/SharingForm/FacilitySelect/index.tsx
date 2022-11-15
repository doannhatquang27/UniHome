import { Chip, TextField } from "@material-ui/core";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { getIconTextFromCode } from "../../../../../../constants/facility-service-icons";
import IFacility from "../../../../../../interfaces/UniHouseApiInterfaces/IFacility";
import { loadAllFacilitiesAPI } from "../../../../../../services/service-facility-services";

const filter = createFilterOptions<string>();

interface Props {
  handleChange: (itemList: string[]) => void;
}

const FacilitySelect: React.FC<Props> = ({ handleChange }) => {
  const [facilityList, setFacilityList] = useState<IFacility[]>([]);
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const [isError, setError] = useState(false);
  const [isBlur, setBlur] = useState(false);

  useEffect(() => {
    const fetchFacilityList = async () => {
      const result = await loadAllFacilitiesAPI();
      if (result) {
        setFacilityList(result);
      }
    };
    fetchFacilityList();
  }, []);

  useEffect(() => {
    if (isBlur) {
      if (selectedList.length === 0) {
        setError(true);
      } else {
        setError(false);
      }
    }
  }, [isBlur, selectedList]);

  const renderIcon = (facilityName: string) => {
    let iconName = "la-border-style";
    if (facilityName && facilityList) {
      const icon = facilityList.find((item) => item.name === facilityName);
      if (icon) {
        iconName = getIconTextFromCode(icon.icon);
      }
    }
    return <span className={`las ${iconName}`} style={{ fontSize: 24 }}></span>;
  };

  const handleOnChange = (value: string[]) => {
    setSelectedList(value);
    handleChange(value);
  };

  const getLabel = (oldLabel: string) => {
    if (oldLabel.startsWith("Thêm mới ")) {
      const splitLabel = oldLabel.split('"');
      return splitLabel[1];
    } else return oldLabel;
  };

  return (
    <Autocomplete
      multiple
      id="facility-select"
      options={facilityList.map((option) => option.name)}
      filterSelectedOptions
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new value
        if (params.inputValue.trim() !== "") {
          filtered.push(`Thêm mới "${params.inputValue}"`);
        }

        return filtered;
      }}
      onChange={(event: any, value: string[]) => handleOnChange(value)}
      onBlur={() => setBlur(true)}
      renderTags={(value: string[], getTagProps) =>
        value.map((option: string, index: number) => (
          <Chip
            variant="outlined"
            label={getLabel(option)}
            icon={renderIcon(getLabel(option))}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Cơ sở vật chất"
          placeholder="Thêm CSVC"
          error={isError ? true : false}
          helperText={isError ? "Chọn ít nhát một cơ sở vật chất" : null}
        />
      )}
    />
  );
};

export default FacilitySelect;
