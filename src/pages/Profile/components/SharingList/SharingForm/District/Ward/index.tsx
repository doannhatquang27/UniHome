import {
  MenuItem,
  OutlinedTextFieldProps,
  TextField,
  TextFieldProps,
} from "@material-ui/core";
import { FormikValues, useField, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import IBuilding from "../../../../../../../interfaces/UniHouseApiInterfaces/IBuilding";
import { loadWardsByIdOfADistrictOfHCMCAPI } from "../../../../../../../services/location-services";

interface OptionProps {
  value: string;
  label: string;
}

const WardWrapper = ({
  name,
  ...otherProps
}: {
  name: string;
  label?: string;
  style?: any;
}) => {
  const [wardList, setWardList] = useState<OptionProps[]>([]);
  const {
    setFieldValue,
    values: { district, building },
  } = useFormikContext<FormikValues>();
  const [field, meta] = useField(name);
  const [value, setValue] = useState("");

  const fetchWardList = async (districtId: string) => {
    const result = await loadWardsByIdOfADistrictOfHCMCAPI(districtId);
    if (result) {
      const list = result
        .sort((a, b) =>
          parseInt(a.name.split(" ")[1]) > parseInt(b.name.split(" ")[1])
            ? 1
            : -1
        )
        .map((ward) => {
          return {
            value: ward.wardId,
            label: ward.name,
          };
        });
      setWardList(list);
    }
  };

  const renderValueFromBuilding = async (building: IBuilding) => {
    const buildingDistrict = building.districtId;
    const buildingWard = building.wardId;
    if (buildingDistrict && buildingWard) {
      setValue("");
      await fetchWardList(buildingDistrict);
      setFieldValue(name, buildingWard);
      setValue(buildingWard);
    }
  };

  useEffect(() => {
    if (Object.keys(building).length > 0) {
      renderValueFromBuilding(building);
    } else {
      if (district) {
        setValue("");
        fetchWardList(district);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [district, building]);

  const handleChange = (event: any) => {
    const { value } = event.target;
    setValue(value);
    setFieldValue(name, value);
  };

  const configSelect: TextFieldProps | OutlinedTextFieldProps = {
    ...field,
    ...otherProps,
    select: true,
    variant: "outlined",
    fullWidth: true,
    value: value,
    disabled: building.wardId ? true : false,
    onChange: handleChange,
  };

  if (meta.touched) {
    if (!district) {
      configSelect.error = true;
      configSelect.helperText = "Vui lòng chọn quận/huyện trước";
    } else if (meta && meta.touched && meta.error) {
      configSelect.error = true;
      configSelect.helperText = meta.error;
    }
  }

  return (
    <TextField {...configSelect}>
      <MenuItem value="" disabled={true}>
        Chọn Phường, Xã
      </MenuItem>
      {wardList.map((item: any) => (
        <MenuItem key={item.label} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default WardWrapper;
