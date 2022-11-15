import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import CustomFormLabel from "../../../../../components/utils/CustomFormLabel";
import * as services from "../../../../../services/location-services";
import "./index.scss";

interface Props {
  handleChangeDistrictId: (value: string | null) => void;
  handleChangeWardId: (value: string | null) => void;
  isDefault: boolean;
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

const AddressSelect: React.FC<Props> = ({
  handleChangeDistrictId,
  handleChangeWardId,
  isDefault,
}) => {
  const classes = useStyles();
  const [selectedDistrict, setSelectedDistrict] = useState<OptionProps | null>(
    null
  );
  const [selectedWard, setSelectedWard] = useState<OptionProps | null>(null);
  const [districtOptions, setDistrictOptions] = useState<OptionProps[]>([]);
  const [wardOptions, setWardOptions] = useState<OptionProps[]>([]);

  const handleChangeDistrict = (data: any, actionMeta: any) => {
    if (data) {
      setSelectedDistrict(data);
    }
    if (actionMeta.action === "clear") {
      setSelectedDistrict(null);
      handleChangeDistrictId(null);
      handleChangeWardId(null);
    }
  };

  const handleChangeWard = (data: any, actionMeta: any) => {
    if (data) {
      setSelectedWard(data);
    }
    if (actionMeta.action === "clear") {
      setSelectedWard(null);
      handleChangeWardId(null);
    }
  };

  const loadAllDistrictOfHCMCity = async () => {
    const result = await services.loadAllDistrictOfHCMCAPI();
    if (result) {
      const tempDistrictOptions = result.map((district) => {
        return {
          value: district.districtId,
          label: district.name,
        };
      });
      setDistrictOptions(tempDistrictOptions);
      setWardOptions([]);
    }
  };

  const loadAllWardOfDistrictByDistrictId = async (districtId: string) => {
    const result = await services.loadWardsByIdOfADistrictOfHCMCAPI(districtId);
    if (result) {
      const tempWardOptions = result.map((ward) => {
        return {
          value: ward.wardId,
          label: ward.name,
        };
      });
      setWardOptions(tempWardOptions);
    }
  };

  useEffect(() => {
    if (isDefault) {
      setSelectedDistrict(null);
      setSelectedWard(null);
    }
  }, [isDefault]);

  useEffect(() => {
    loadAllDistrictOfHCMCity();
  }, []);

  useEffect(() => {
    if (selectedDistrict !== null) {
      setSelectedWard(null);
      loadAllWardOfDistrictByDistrictId(selectedDistrict.value);

      if (!isDefault) {
        handleChangeDistrictId(selectedDistrict.value);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDefault, selectedDistrict]);

  useEffect(() => {
    if (selectedWard && !isDefault && selectedDistrict) {
      handleChangeWardId(selectedWard.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDefault, selectedWard]);

  return (
    <div>
      <FormControl className="form-control" classes={{ root: classes.root }}>
        <CustomFormLabel content="Quận, huyện" />
        <Select
          options={districtOptions}
          onChange={handleChangeDistrict}
          placeholder="Chọn ..."
          value={selectedDistrict}
          isClearable
          isSearchable
        />
      </FormControl>
      <FormControl className="form-control" classes={{ root: classes.root }}>
        <CustomFormLabel content="Xã, Phường" />
        <Select
          options={wardOptions}
          onChange={handleChangeWard}
          placeholder="Chọn ..."
          value={selectedWard}
          isClearable
          isSearchable
        />
      </FormControl>
    </div>
  );
};

export default AddressSelect;
