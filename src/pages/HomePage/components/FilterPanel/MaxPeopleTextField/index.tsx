import { FormControl, makeStyles, TextField } from "@material-ui/core";
import { ChangeEvent, useEffect, useState } from "react";
import CustomFormLabel from "../../../../../components/utils/CustomFormLabel";

const ConstantField = {
  MIN_PEOPLE: 1,
  MAX_PEOPLE: 100,
};

interface Props {
  handleChangeMaxPeople: (maxPeople: number) => void;
  isDefault: boolean;
}

const useStyles = makeStyles({
  root: {
    padding: "10px 0",
  },
});

const MaxPeopleTextField: React.FC<Props> = ({
  isDefault,
  handleChangeMaxPeople,
}) => {
  const classes = useStyles();
  const [value, setValue] = useState<number | string>("");

  useEffect(() => {
    if (typeof value === "number") {
      const delay = setTimeout(() => {
        handleChangeMaxPeople(value);
      }, 1000);
      return () => clearTimeout(delay);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const checkUserInput = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    // when input empty
    if (event.target.value === "") {
      setValue("");
    } else {
      let value = Number(event.target.value);
      if (value > ConstantField.MAX_PEOPLE) {
        value = ConstantField.MAX_PEOPLE;
      }
      if (value < ConstantField.MIN_PEOPLE) {
        value = ConstantField.MIN_PEOPLE;
      }
      setValue(value);
    }
  };

  return (
    <FormControl className="form-control" classes={{ root: classes.root }}>
      <CustomFormLabel content="Số lượng thành viên tối đa" />
      <TextField
        type="number"
        value={value}
        variant="outlined"
        size="small"
        onChange={checkUserInput}
        inputProps={{
          min: ConstantField.MIN_PEOPLE,
          max: ConstantField.MAX_PEOPLE,
        }}
      />
    </FormControl>
  );
};

export default MaxPeopleTextField;
