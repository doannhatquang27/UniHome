import { makeStyles } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio, { RadioProps } from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { withStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import CustomFormLabel from "../../../../../components/utils/CustomFormLabel";
import { COLORS } from "../../../../../constants/color";

enum SortTypeEnum {
  "price_asc",
  "price_desc",
  "area_asc",
  "area_desc",
}

interface Props {
  handleChangeOrder: (value: number) => void;
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

const RadioButtonsGroup: React.FC<Props> = ({
  handleChangeOrder,
  isDefault,
}) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (isDefault) {
      setValue(0);
    }
  }, [isDefault]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const eventValue = Number((event.target as HTMLInputElement).value);
    setValue(eventValue);
    handleChangeOrder(eventValue);
  };

  return (
    <FormControl component="fieldset">
      <CustomFormLabel content="Sắp xếp theo" />
      <RadioGroup
        aria-label="gender"
        name="gender1"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel
          value={SortTypeEnum.price_asc}
          control={<GreenRadio />}
          label="Giá thấp trước"
          classes={{ label: classes.label }}
        />
        <FormControlLabel
          value={SortTypeEnum.price_desc}
          control={<GreenRadio />}
          label="Giá cao trước"
          classes={{ label: classes.label }}
        />
        <FormControlLabel
          value={SortTypeEnum.area_asc}
          control={<GreenRadio />}
          label="Diện tích nhỏ trước"
          classes={{ label: classes.label }}
        />
        <FormControlLabel
          value={SortTypeEnum.area_desc}
          control={<GreenRadio />}
          label="Diện tích lớn trước"
          classes={{ label: classes.label }}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonsGroup;
