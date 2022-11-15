import { makeStyles, withStyles } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio, { RadioProps } from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import CustomFormLabel from "../../../../../components/utils/CustomFormLabel";
import { COLORS } from "../../../../../constants/color";
import IHouseType from "../../../../../interfaces/UniHouseApiInterfaces/IHouseType";
import { loadAllHouseType } from "../../../../../services/house-services";

type Params = {
  type: string;
};

interface Props {
  isDefault: boolean;
  handleChangeHouseType: (value: string | undefined) => void;
}

const useStyles = makeStyles(() => ({
  label: {
    fontSize: 13,
    fontWeight: 400,
    color: "#42464d",
  },
}));

const GreenRadio = withStyles({
  root: {
    padding: "4px 9px",
    "&$checked": {
      color: COLORS.appMainColor,
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

const RentTypeCheckBox: React.FC<Props> = ({
  isDefault,
  handleChangeHouseType,
}) => {
  const classes = useStyles();
  const { type } = useParams<Params>();
  let history = useHistory();
  const [rentTypes, setRentTypes] = useState<IHouseType[]>([]);
  const [value, setValue] = React.useState("");

  const loadAllRentTypes = async () => {
    const rentTypesResult = await loadAllHouseType();
    setRentTypes(rentTypesResult);
  };

  useEffect(() => {
    loadAllRentTypes();
  }, []);

  useEffect(() => {
    setValue("");
    handleChangeHouseType(undefined);
  }, [handleChangeHouseType, isDefault]);

  useEffect(() => {
    if (rentTypes.length > 0 && type) {
      const tempSelectedRentType = rentTypes.find(
        (rentType) => removeAccents(rentType.name) === type
      );
      setValue(tempSelectedRentType!.houseTypeId);
    }
  }, [rentTypes, rentTypes.length, type]);

  const removeAccents = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .replace(/\s/g, "-")
      .toLocaleLowerCase();
  };

  const findRentTypeName = (id: string) => {
    let result = "";
    const selectedType = rentTypes.find((type) => type.houseTypeId === id);
    if (selectedType) {
      result = removeAccents(selectedType.name);
    }
    return result;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rentTypeId = event.target.value;
    if (rentTypeId) {
      setValue(rentTypeId);
      const rentTypeNameUrl = findRentTypeName(rentTypeId);
      // history.push(`/type/${rentTypeNameUrl}`);
      handleChangeHouseType(rentTypeNameUrl);
    } else {
      setValue("");
      history.push("/home");
    }
  };

  return (
    <FormControl component="fieldset">
      <CustomFormLabel content="Loại nhà" />
      <RadioGroup
        aria-label="type"
        name="type"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel
          value={""}
          control={<GreenRadio />}
          label="Tất cả"
          classes={{ label: classes.label }}
        />
        {rentTypes
          ? rentTypes.map((type) => (
              <FormControlLabel
                key={type.houseTypeId}
                value={type.houseTypeId}
                control={<GreenRadio />}
                label={type.name}
                classes={{ label: classes.label }}
              />
            ))
          : null}
      </RadioGroup>
    </FormControl>
  );
};

export default RentTypeCheckBox;
