import { FormControl } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CustomFormLabel from "../../../../../components/utils/CustomFormLabel";
import { COLORS } from "../../../../../constants/color";
import "./index.scss";

interface Props {
  handleChangeMinMaxPrice: (min: number, max: number) => void;
  isDefault: boolean;
  setDefaultFalse: () => void;
}

const PriceSlider: React.FC<Props> = ({
  handleChangeMinMaxPrice,
  isDefault,
  setDefaultFalse,
}) => {
  const [value, setValue] = React.useState<number[]>([0, 30]);
  const [onBlur, setOnBlur] = React.useState(false);

  React.useEffect(() => {
    if (isDefault) {
      setValue([0, 30]);
      setDefaultFalse();
    }
  }, [isDefault, setDefaultFalse]);

  React.useEffect(() => {
    if (onBlur) {
      const delay = setTimeout(() => {
        const min = value[0];
        const max = value[1];
        handleChangeMinMaxPrice(min * 1000000, max * 1000000);
        setOnBlur(false);
      }, 1000);
      return () => clearTimeout(delay);
    }
  }, [handleChangeMinMaxPrice, onBlur, value]);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();
  const min = query.get("min");
  const max = query.get("max");

  const changeToDefault = () => {
    setOnBlur(false);
    setValue([0, 30]);
  };

  useEffect(() => {
    if (min && max) {
      const urlValue = [min as unknown as number, max as unknown as number];
      setValue(urlValue);
    } else {
      changeToDefault();
    }
  }, [max, min]);

  const handleChange = (event: any, newValue: number | number[]) => {
    setOnBlur(true);
    setValue(newValue as number[]);
  };

  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 30,
      label: "30",
    },
  ];

  const addMoreMark = () => {
    const temp = [...marks];
    if (value[0] !== 0) {
      temp.push({
        value: value[0],
        label: `${value[0]}`,
      });
    }
    if (value[1] !== 30) {
      temp.push({
        value: value[1],
        label: `${value[1]}`,
      });
    }
    return temp;
  };

  return (
    <FormControl component="fieldset" style={{ width: "100%" }}>
      <CustomFormLabel content="Giá phòng" />
      <span className="price-slider-label">Đơn vị: triệu đồng</span>
      <Slider
        orientation="horizontal"
        value={value}
        onChange={handleChange}
        min={0}
        step={0.1}
        max={30}
        aria-labelledby="range-slider"
        style={{ color: COLORS.appMainColor, marginTop: 10 }}
        className="price-slider"
        marks={addMoreMark()}
        valueLabelDisplay="auto"
      />
    </FormControl>
  );
};

export default PriceSlider;
