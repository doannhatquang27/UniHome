/* eslint-disable @typescript-eslint/no-unused-vars */
import { Chip, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import IUniversity from "../../../../../../interfaces/UniHouseApiInterfaces/IUniversity";
import { getAllUniversitiesAPI } from "../../../../../../services/university-services";

interface Props {
  handleChange: (itemList: string[]) => void;
}

const UniversitySelect: React.FC<Props> = ({ handleChange }) => {
  const [universityList, setUniversityList] = useState<IUniversity[]>([]);
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const [isBlur, setBlur] = useState(false);

  useEffect(() => {
    const fetchUniversityList = async () => {
      const result = await getAllUniversitiesAPI();
      if (result) {
        setUniversityList(result);
      }
    };
    fetchUniversityList();
  }, []);

  const handleOnChange = (value: string[]) => {
    setSelectedList(value);
    handleChange(value);
  };

  return (
    <Autocomplete
      multiple
      id="university-select"
      options={universityList.map((option) => option.name)}
      filterSelectedOptions
      onChange={(event: any, value: string[]) => handleOnChange(value)}
      onBlur={() => setBlur(true)}
      renderTags={(value: string[], getTagProps) =>
        value.map((option: string, index: number) => (
          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Hỗ trợ trường đại học / cao đẳng"
          placeholder="Thêm trường đại học / cao đẳng"
        />
      )}
    />
  );
};

export default UniversitySelect;
