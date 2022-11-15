import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { COLORS } from "../../../../../../constants/color";
import IService from "../../../../../../interfaces/UniHouseApiInterfaces/IService";
import { loadAllServicesAPI } from "../../../../../../services/service-facility-services";
import NewServiceModel from "./NewServiceModel";
import ServiceSelectItem from "./ServiceSelectItem";

export enum PriceUnit {
  Month,
  Person,
  CubicMetre,
  KilowattHour,
}

export enum ServiceModalStatus {
  Create,
  Update,
  NotSelect,
}

export interface ServiceSelectInfo {
  serviceId: string;
  serviceName: string;
  price?: number;
  unit?: PriceUnit;
  selected: boolean;
  isConsistent?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addButtonRoot: {
      float: "right",
    },
  })
);

const convertToServiceSelectInfo = (service: IService) => {
  const convertedService: ServiceSelectInfo = {
    serviceId: service.serviceId,
    serviceName: service.name,
    selected: false,
  };
  return convertedService;
};

interface Props {
  handleChangeNewServiceList: (newServiceList: ServiceSelectInfo[]) => void;
}

const ServiceSelect2: React.FC<Props> = ({ handleChangeNewServiceList }) => {
  const classes = useStyles();
  const [serviceList, setServiceList] = useState<ServiceSelectInfo[]>([]);
  const [selectedService, setSelectedService] =
    useState<ServiceSelectInfo | null>(null);
  const [toggleNew, setToggleNew] = useState(false);
  const [count, setCount] = useState(2);
  const [key, setKey] = useState(0);

  useEffect(() => {
    handleChangeNewServiceList(serviceList);
  }, [handleChangeNewServiceList, serviceList, key]);

  useEffect(() => {
    const fetchServiceList = async () => {
      const result = await loadAllServicesAPI();
      if (result) {
        const convertedList = result.map((service) =>
          convertToServiceSelectInfo(service)
        );
        const data: ServiceSelectInfo[] = [];
        data.forEach((service) => convertedList.push(service));
        setServiceList(convertedList);
      }
    };
    fetchServiceList();
  }, []);

  const toggleUpdateModal = (service: ServiceSelectInfo) => {
    setSelectedService(service);
    setToggleNew(true);
  };

  const addNewService = (service: ServiceSelectInfo) => {
    service.serviceId = `New ${count}`;
    service.isConsistent = true;
    service.selected = true;
    setCount(count + 1);
    setServiceList((oldArray) => [service, ...oldArray]);
  };

  const updateService = (service: ServiceSelectInfo) => {
    const index = serviceList.findIndex(
      (item) => item.serviceId === service.serviceId
    );
    service.selected = true;
    if (index !== -1) {
      let templist = serviceList;
      templist[index] = service;
      setServiceList(templist);
    }
  };

  const handleSave = (status: ServiceModalStatus, data: ServiceSelectInfo) => {
    if (status === ServiceModalStatus.Create) {
      addNewService(data);
    } else {
      updateService(data);
    }
    setKey(key + 1);
  };

  const toggleSelect = (service: ServiceSelectInfo) => {
    const index = serviceList.findIndex(
      (item) => item.serviceId === service.serviceId
    );
    service.selected = !service.selected;
    if (index !== -1) {
      let templist = serviceList;
      templist[index] = service;
      setServiceList(templist);
      setKey(key + 1);
    }
  };

  return (
    <React.Fragment key={key}>
      <Grid container alignItems="center">
        <Grid item xs={8}>
          <span>Dịch vụ, tiện ích</span>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="text"
            style={{ color: COLORS.appMainColor }}
            classes={{ root: classes.addButtonRoot }}
            onClick={() => {
              setSelectedService(null);
              setToggleNew(true);
            }}
          >
            + Thêm mới
          </Button>
        </Grid>
      </Grid>

      {serviceList.map((service, index) => (
        <ServiceSelectItem
          key={index}
          serviceInfo={service}
          toggleUpdateModel={toggleUpdateModal}
          toggleSelect={toggleSelect}
        />
      ))}

      <NewServiceModel
        open={toggleNew}
        onClose={() => setToggleNew(false)}
        data={selectedService}
        handleSave={handleSave}
      />
    </React.Fragment>
  );
};

export default ServiceSelect2;
