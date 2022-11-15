import { CreateServiceDTO } from "../../../../../../dtos/facilityAndServiceDtos/CreateServiceDTO";
import IService from "../../../../../../interfaces/UniHouseApiInterfaces/IService";
import IUser from "../../../../../../interfaces/UniHouseApiInterfaces/IUser";
import { createServiceByRenterAPI } from "../../../../../../services/service-facility-services";
import { ServiceSelectInfo } from "../NewServiceSelect";
import { convertUnitToVietnamese } from "../NewServiceSelect/ServiceSelectItem";

interface INewRentService {
  serviceId: string;
  oldNumber: number;
  newNumber: number;
  newNumberRequest: number;
  createdTime: Date;
}

const createNewService = async (
  serviceInfo: ServiceSelectInfo,
  currentUser: IUser | null,
  accessToken: string | null
) => {
  const { price, unit, isConsistent } = serviceInfo;
  let result: IService | null = null;
  if (currentUser && accessToken) {
    // when service info lack of information return null
    if (
      price === undefined ||
      unit === undefined ||
      isConsistent === undefined
    ) {
      return result;
    } else {
      const data: CreateServiceDTO = {
        name: serviceInfo.serviceName,
        createdBy: currentUser.userId,
        price: price,
        unitName: convertUnitToVietnamese(unit),
        isFixed: isConsistent,
      };
      const response = await createServiceByRenterAPI(data, accessToken);
      if (response !== undefined) {
        result = response;
      }
    }
  }
  return result;
};

const getServiceIdList = async (
  serviceList: ServiceSelectInfo[],
  currentUser: IUser | null,
  accessToken: string | null
) => {
  const availableServiceList = serviceList.filter(
    (item) => !item.serviceId.startsWith("New")
  );

  const newServiceList = serviceList.filter((item) =>
    item.serviceId.startsWith("New")
  );

  // create new service
  const createdServiceList: IService[] = [];
  for (let index = 0; index < newServiceList.length; index++) {
    const createdService = await createNewService(
      newServiceList[index],
      currentUser,
      accessToken
    );
    if (createdService !== null) {
      createdServiceList.push(createdService);
    }
  }

  // combine and get service id
  const serviceIdList = availableServiceList.map((item) => item.serviceId);

  return serviceIdList;
};

export const getRentServiceList = async (
  serviceList: ServiceSelectInfo[],
  currentUser: IUser | null,
  accessToken: string | null
) => {
  const serviceIdList = await getServiceIdList(
    serviceList,
    currentUser,
    accessToken
  );

  // const rentServiceList = serviceIdList.map((item) => {
  //   const rentService: INewRentService = {
  //     serviceId: item,
  //     newNumber: 0,
  //     oldNumber: 0,
  //     newNumberRequest: 0,
  //     createdTime: new Date(Date.now()),
  //   };
  //   return rentService;
  // });

  return serviceIdList;
};
