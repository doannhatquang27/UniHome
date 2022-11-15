import { makeStyles } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio, { RadioProps } from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { withStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import CustomFormLabel from "../../../../../components/utils/CustomFormLabel";
import { COLORS } from "../../../../../constants/color";
import { Gender } from "../../../../../enums/EnumGender";

interface Props {
  handleChangeGender: (value: Gender) => void;
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

const GenderCheckBox: React.FC<Props> = ({ isDefault, handleChangeGender }) => {
  const classes = useStyles();
  const [value, setValue] = useState(Gender.all);

  useEffect(() => {
    if (isDefault) {
      setValue(Gender.all);
    }
  }, [isDefault]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const eventValue = event.target.value;
    const convertedValue = Number(eventValue);
    setValue(convertedValue);
    handleChangeGender(convertedValue);
  };

  return (
    <FormControl component="fieldset">
      <CustomFormLabel content="Giới tính" />
      <RadioGroup
        aria-label="gender"
        name="gender"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel
          value={Gender.all}
          control={<GreenRadio />}
          label="Tất cả"
          classes={{ label: classes.label }}
        />
        <FormControlLabel
          value={Gender.male}
          control={<GreenRadio />}
          label="Nam"
          classes={{ label: classes.label }}
        />
        <FormControlLabel
          value={Gender.female}
          control={<GreenRadio />}
          label="Nữ"
          classes={{ label: classes.label }}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default GenderCheckBox;
