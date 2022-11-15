import { Chip, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { getIconTextFromCode } from "../../../../../../constants/facility-service-icons";
import IService from "../../../../../../interfaces/UniHouseApiInterfaces/IService";
import { loadAllServicesAPI } from "../../../../../../services/service-facility-services";

interface Props {
  handleChange: (itemList: string[]) => void;
}

const ServiceSelect: React.FC<Props> = ({ handleChange }) => {
  const [serviceList, setServiceList] = useState<IService[]>([]);
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const [isError, setError] = useState(false);
  const [isBlur, setBlur] = useState(false);

  useEffect(() => {
    const fetchServiceList = async () => {
      const result = await loadAllServicesAPI();
      if (result) {
        setServiceList(result);
      }
    };
    fetchServiceList();
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

  const renderIcon = (serviceName: string) => {
    let iconName = "la-border-style";
    if (serviceName && serviceList) {
      const icon = serviceList.find((item) => item.name === serviceName);
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

  return (
    <Autocomplete
      multiple
      id="service-select"
      options={serviceList.map((option) => option.name)}
      filterSelectedOptions
      onChange={(event: any, value: string[]) => handleOnChange(value)}
      onBlur={() => setBlur(true)}
      renderTags={(value: string[], getTagProps) =>
        value.map((option: string, index: number) => (
          <Chip
            variant="outlined"
            label={option}
            icon={renderIcon(option)}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Dịch vụ, tiện ích"
          placeholder="Thêm dịch vụ, tiện ích"
          error={isError ? true : false}
          helperText={isError ? "Chọn ít nhát một dịch vụ, tiện ích" : null}
        />
      )}
    />
  );
};

export default ServiceSelect;
