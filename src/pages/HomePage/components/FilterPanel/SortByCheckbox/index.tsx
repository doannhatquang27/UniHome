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
  "name_asc",
  "name_desc",
  "date_asc",
  "date_desc",
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
  const [value, setValue] = useState(3);

  useEffect(() => {
    if (isDefault) {
      setValue(3);
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
          value={SortTypeEnum.date_desc}
          control={<GreenRadio />}
          label="Mới nhất"
          classes={{ label: classes.label }}
        />
        <FormControlLabel
          value={SortTypeEnum.date_asc}
          control={<GreenRadio />}
          label="Cũ nhất"
          classes={{ label: classes.label }}
        />
        <FormControlLabel
          value={SortTypeEnum.name_asc}
          control={<GreenRadio />}
          label="A -> Z"
          classes={{ label: classes.label }}
        />
        <FormControlLabel
          value={SortTypeEnum.name_desc}
          control={<GreenRadio />}
          label="Z -> A"
          classes={{ label: classes.label }}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonsGroup;
