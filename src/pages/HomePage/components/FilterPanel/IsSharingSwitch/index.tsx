import { FormControl, makeStyles, withStyles } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import React, { FC, useEffect } from "react";
import { COLORS } from "../../../../../constants/color";

const GreenSwitch = withStyles({
  switchBase: {
    color: COLORS.appMainColor,
    "&$checked": {
      color: COLORS.appMainColor,
    },
    "&$checked + $track": {
      backgroundColor: COLORS.appMainColor,
    },
  },
  checked: {},
  track: {},
})(Switch);

interface Props {
  setSelectSharing: (value: boolean) => void;
  isDefault: boolean;
}

const ISharingSwitch: FC<Props> = ({ setSelectSharing, isDefault }) => {
  const classes = useStyles();
  const [isChecked, setChecked] = React.useState(false);

  useEffect(() => {
    setChecked(false);
  }, [isDefault]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setSelectSharing(event.target.checked);
  };

  return (
    <FormControl component="fieldset" style={{ paddingTop: 30 }}>
      <FormGroup aria-label="position">
        <FormControlLabel
          control={<GreenSwitch checked={isChecked} onChange={handleChange} />}
          label="Ở ghép"
          labelPlacement="start"
          classes={{
            label: classes.formLabelRoot,
            labelPlacementStart: classes.labelPlacementStart,
          }}
        />
      </FormGroup>
    </FormControl>
  );
};

export default ISharingSwitch;

const useStyles = makeStyles((theme) => ({
  formLabelRoot: {
    fontSize: "1rem",
    fontWeight: 700,
    textTransform: "uppercase",
    color: "#42464d",
    display: "flex",
    flex: 1,
  },
  labelPlacementStart: {
    margin: 0,
  },
}));
