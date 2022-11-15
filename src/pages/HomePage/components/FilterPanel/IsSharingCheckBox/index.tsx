import { makeStyles } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio, { RadioProps } from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { withStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import CustomFormLabel from "../../../../../components/utils/CustomFormLabel";
import { COLORS } from "../../../../../constants/color";

interface Props {
  handleChangeSharing: (value: number | null) => void;
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

const IsSharingCheckBox: React.FC<Props> = ({
  isDefault,
  handleChangeSharing,
}) => {
  const classes = useStyles();
  const [value, setValue] = useState("");

  useEffect(() => {
    if (isDefault) {
      setValue("");
    }
  }, [isDefault]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const eventValue = event.target.value;
    setValue(eventValue);
    const convertedValue = eventValue ? Number(eventValue) : null;
    handleChangeSharing(convertedValue);
  };

  return (
    <FormControl component="fieldset">
      <CustomFormLabel content="Ghép phòng" />
      <RadioGroup
        aria-label="sharing"
        name="sharing"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel
          value={""}
          control={<GreenRadio />}
          label="Tất cả"
          classes={{ label: classes.label }}
        />
        <FormControlLabel
          value={"1"}
          control={<GreenRadio />}
          label="Có"
          classes={{ label: classes.label }}
        />
        <FormControlLabel
          value={"2"}
          control={<GreenRadio />}
          label="Không"
          classes={{ label: classes.label }}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default IsSharingCheckBox;
