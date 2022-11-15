import { CreateFacilityDto } from "../dtos/facilityAndServiceDtos/CreateFacilityDto";
import { CreateServiceDTO } from "../dtos/facilityAndServiceDtos/CreateServiceDTO";
import IFacility from "../interfaces/UniHouseApiInterfaces/IFacility";
import IService from "../interfaces/UniHouseApiInterfaces/IService";
import axiosInstance from "./axios-instance";

export const loadAllServicesAPI = async () => {
  const url = "/services";
  let result: IService[] = [];
  await axiosInstance
    .get(url)
    .then((response) => {
      result = response.data as IService[];
    })
    .catch((error) => console.error(error));
  return result;
};

export const loadAllFacilitiesAPI = async () => {
  const url = "/facilities";
  let result: IFacility[] = [];
  await axiosInstance
    .get(url)
    .then((response) => {
      result = response.data as IFacility[];
    })
    .catch((error) => console.error(error));
  return result;
};

export const createFacilityByRenterAPI = async (
  data: CreateFacilityDto,
  accessToken: string
) => {
  const url = "/facilities";
  let result: IFacility | undefined;
  await axiosInstance
    .post(url, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((response) => {
      result = response.data as IFacility;
    })
    .catch((error) => console.error(error));
  return result;
};

export const createServiceByRenterAPI = async (
  data: CreateServiceDTO,
  accessToken: string
) => {
  const url = "/services";
  let result: IService | undefined;
  await axiosInstance
    .post(url, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((response) => {
      result = response.data as IService;
    })
    .catch((error) => console.error(error));
  return result;
};
