import {
  Grid,
  MenuItem,
  OutlinedTextFieldProps,
  TextField,
  TextFieldProps,
} from "@material-ui/core";
import { FormikValues, useField, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import IBuilding from "../../../../../../interfaces/UniHouseApiInterfaces/IBuilding";
import { loadAllBuilding } from "../../../../../../services/building-services";

const BuildingWrapper = ({
  name,
  ...otherProps
}: {
  name: string;
  label?: string;
  style?: any;
}) => {
  const [buildingList, setBuldingList] = useState<IBuilding[]>([]);
  const {
    setFieldValue,
    values: { type },
  } = useFormikContext<FormikValues>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta] = useField(name);

  const handleChange = (event: any) => {
    const { value } = event.target;
    setFieldValue(name, value);
    setFieldValue(
      "building",
      buildingList.find((item) => item.buildingId === value)
    );
  };

  const configSelect: TextFieldProps | OutlinedTextFieldProps = {
    ...field,
    ...otherProps,
    select: true,
    variant: "outlined",
    fullWidth: true,
    onChange: handleChange,
  };

  useEffect(() => {
    if (type === "4aa38971-56ed-43f2-9b3c-05fb221ca4cf") {
      const fetchBuildingList = async () => {
        const result = await loadAllBuilding();
        if (result) {
          setBuldingList(result);
        }
      };
      fetchBuildingList();
    } else {
      setBuldingList([]);
      setFieldValue("building", {});
      setFieldValue("buildingId", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  if (type) {
    if (!field) {
      configSelect.error = true;
      configSelect.helperText = "Vui lòng chọn một loại căn hộ";
    }
  }

  return (
    <div style={{ width: "100%" }}>
      {buildingList.length > 0 ? (
        <Grid
          item
          xs={12}
          style={{
            padding: "8px",
          }}
        >
          <TextField {...configSelect}>
            {buildingList.map((item: any) => (
              <MenuItem key={item.buildingId} value={item.buildingId}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      ) : null}
    </div>
  );
};

export default BuildingWrapper;
