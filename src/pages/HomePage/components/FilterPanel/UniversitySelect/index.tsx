import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Select from "react-select";
import CustomFormLabel from "../../../../../components/utils/CustomFormLabel";
import { getAllUniversitiesAPI } from "../../../../../services/university-services";
import { convertNameToUrl } from "../../../../../services/utils/navigation";
import "./index.scss";

interface Props {
  // isDefault: boolean;
}

interface OptionProps {
  value: string;
  label: string;
}

const useStyles = makeStyles({
  root: {
    padding: "10px 0",
  },
});

const UniversitySelect: React.FC<Props> = () => {
  const classes = useStyles();
  const history = useHistory();
  const [universityOptions, setUniversityOptions] = useState<OptionProps[]>([]);
  const [selectedUniversity, setSelectedUniversity] =
    useState<OptionProps | null>(null);

  useEffect(() => {
    const fetchAllUniversities = async () => {
      const result = await getAllUniversitiesAPI();
      if (result) {
        const universityOptions = result.map((uni) => {
          return {
            value: uni.universityId,
            label: uni.name,
          };
        });
        setUniversityOptions(universityOptions);
      }
    };
    fetchAllUniversities();
  }, []);

  const handleChangeUniversity = (data: any, actionMeta: any) => {
    if (data) {
      setSelectedUniversity(data);
      const uniName = convertNameToUrl((data as OptionProps).label);
      history.push(`/university/${uniName}`);
    }
    if (actionMeta.action === "clear") {
      setSelectedUniversity(null);
    }
  };

  return (
    <div>
      <FormControl className="form-control" classes={{ root: classes.root }}>
        <CustomFormLabel content="Đại học" />
        <Select
          options={universityOptions}
          onChange={handleChangeUniversity}
          placeholder="Chọn ..."
          value={selectedUniversity}
          isClearable
          isSearchable
        />
      </FormControl>
    </div>
  );
};

export default UniversitySelect;
