import { makeStyles } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio, { RadioProps } from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { withStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import CustomFormLabel from "../../../../../components/utils/CustomFormLabel";
import { COLORS } from "../../../../../constants/color";
import { FilterType } from "../../../../../enums/EnumFilterType";

interface Props {
  handleChangeFilterType: (value: FilterType) => void;
  isDefault: boolean;
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

const FilterTypeCheckbox: React.FC<Props> = ({
  isDefault,
  handleChangeFilterType,
}) => {
  const classes = useStyles();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();
  const filterTypeQuery = query.get("filterType");

  const [value, setValue] = useState(
    filterTypeQuery ? Number(filterTypeQuery) : FilterType.custom
  );

  useEffect(() => {
    if (isDefault) {
      setValue(FilterType.custom);
    }
  }, [isDefault]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const eventValue = event.target.value;
    const convertedValue = Number(eventValue);
    if (convertedValue === FilterType.nearMe) {
      if (navigator.geolocation) {
        setValue(convertedValue);
        handleChangeFilterType(convertedValue);
      }
    } else {
      setValue(convertedValue);
      handleChangeFilterType(convertedValue);
    }
  };

  return (
    <FormControl component="fieldset">
      <CustomFormLabel content="Tìm theo" />
      <RadioGroup
        aria-label="filter type"
        name="filter type"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel
          value={FilterType.custom}
          control={<GreenRadio />}
          label="Tùy chỉnh"
          classes={{ label: classes.label }}
        />
        <FormControlLabel
          value={FilterType.nearMe}
          control={<GreenRadio />}
          label="Gần bạn"
          classes={{ label: classes.label }}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default FilterTypeCheckbox;
