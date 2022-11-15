import React from "react";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const CustomSelection = () => {
  const [value, setValue] = React.useState<string | null>();

  const handleChange = (data: any) =>
    data ? setValue(data.value) : setValue(null);

  return (
    <div style={{ width: 300, marginLeft: 50 }}>
      <Select
        options={options}
        onChange={handleChange}
        placeholder="Address..."
        isClearable
        isSearchable
      />
      <div>{value}</div>
    </div>
  );
};

export default CustomSelection;
