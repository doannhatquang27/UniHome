import { GetHouseListDTO } from "../dtos/houseDtos/GetHouseListDto";
import { NewHouseAndSlotAndUniversitiesDTO } from "../dtos/rentDtos/NewHouseAndSlotDTO";
import IHouse from "../interfaces/UniHouseApiInterfaces/IHouse";
import { IHouseListWithTotalPage } from "../interfaces/UniHouseApiInterfaces/IHouseListWithTotalPage";
import IHouseType from "../interfaces/UniHouseApiInterfaces/IHouseType";
import IOwner from "../interfaces/UniHouseApiInterfaces/IOwner";
import axiosInstance from "./axios-instance";

export const addNewOwner = async (request: any, accessToken: string) => {
  const url = "/houses/house-owner";
  let result: IOwner | undefined;
  await axiosInstance
    .post(url, request, { headers: { Authorization: `Bearer ${accessToken}` } })
    .then((response) => (result = response.data as unknown as IOwner))
    .catch((error) => console.error(error));
  return result;
};

export const getAvailableHouseListAPI = async (payload: GetHouseListDTO) => {
  const url = "/houses";
  const {
    creatorId,
    districtId,
    houseTypeId,
    name,
    orderBy,
    orderType,
    pageNumber,
    pageSize,
    status,
    wardId,
    gender,
    isSharing,
    maxArea,
    maxPrice,
    minArea,
    minPrice,
    rentStatus,
    includeRenType,
  } = payload;

  let params: { [k: string]: any } = {};
  params = {
    creatorId,
    districtId,
    houseTypeId,
    name,
    orderBy,
    orderType,
    pageNumber,
    pageSize,
    status,
    wardId,
    gender,
    isSharing,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    rentStatus,
    includeRenType,
  };
  let result: IHouseListWithTotalPage | undefined;
  await axiosInstance
    .get(url, { params: params })
    .then((response) => {
      result = response.data as IHouseListWithTotalPage;
    })
    .catch((error) => console.error(error));
  return result;
};

export const getHouseListWithDistanceAPI = async (
  x: number,
  y: number,
  pageNumber: number
) => {
  const url = "/houses/near-by";
  const pageSize = 12;
  let result: IHouseListWithTotalPage | undefined;
  await axiosInstance
    .get(url, { params: { x, y, pageNumber, pageSize } })
    .then((response) => {
      result = response.data as IHouseListWithTotalPage;
    })
    .catch((error) => console.error(error));
  return result;
};

export const getHouseListForCarouselAPI = async (
  page: number,
  pageSize: number,
  districtId: string | undefined,
  wardId: string | undefined
) => {
  const url = "/houses";
  let params: { [k: string]: any } = {};
  params = { districtId, wardId, page, pageSize, status: 1, rentStatus: 1 };
  let result: IHouseListWithTotalPage | undefined;
  await axiosInstance
    .get(url, { params: params })
    .then((response) => {
      result = response.data as IHouseListWithTotalPage;
    })
    .catch((error) => console.error(error));
  return result;
};

export const loadListHousesAPI = async (page: number) => {
  const url = "/house";
  let result: IHouse[] = [];
  await axiosInstance
    .get(url, {
      params: {
        page,
      },
    })
    .then((response) => {
      result = response.data as unknown as IHouse[];
    })
    .catch((error) => console.error(error));
  return result;
};

export const getHouseByIdAPI = async (id: string) => {
  const url = `/houses/${id}`;
  let result: IHouse | undefined;
  await axiosInstance
    .get(url)
    .then((response) => {
      result = response.data as unknown as IHouse;
    })
    .catch((error) => console.error(error));
  return result;
};

export const loadListHousesByALetterInNameAPI = async (
  page: number,
  name: string
) => {
  const url = `/house/${name}`;
  let result: IHouse[] = [];
  await axiosInstance
    .get(url, {
      params: {
        page,
      },
    })
    .then((response) => {
      result = response.data as unknown as IHouse[];
    })
    .catch((error) => console.error(error));
  return result;
};

export const loadListHousesByOwnerIdAPI = async (
  ownerId: string,
  page: number
) => {
  const url = "/house/owner";
  let result: IHouse[] = [];
  await axiosInstance
    .get(url, {
      params: {
        page,
        ownerId,
      },
    })
    .then((response) => {
      result = response.data as unknown as IHouse[];
    })
    .catch((error) => console.error(error));
  return result;
};

export const addHouseAPI = async (house: IHouse, accessToken: string) => {
  const url = "/newhouse";
  let result = false;
  await axiosInstance
    .post(url, house, { headers: { Authorization: `Bearer ${accessToken}` } })
    .then(() => (result = true))
    .catch((error) => console.error(error));
  return result;
};

export const addHouseAndItsSlotAndUniversitiesAPI = async (
  data: NewHouseAndSlotAndUniversitiesDTO,
  accessToken: string
) => {
  const url = "/houses/with-slot-university";
  let result: IHouse | undefined;
  await axiosInstance
    .post(url, data, { headers: { Authorization: `Bearer ${accessToken}` } })
    .then((response) => (result = response.data as IHouse))
    .catch((error) => console.error(error));
  return result;
};

export const updateHouseAPI = async (data: IHouse, accessToken: string) => {
  const url = "/updatehouse";
  let result = false;
  await axiosInstance
    .put(url, data, { headers: { Authorization: `Bearer ${accessToken}` } })
    .then(() => (result = true))
    .catch((error) => console.error(error));
  return result;
};

export const deleteHouseAPI = async (id: string, accessToken: string) => {
  const url = `houses/${id}`;
  let result = false;
  await axiosInstance
    .delete(url, { headers: { Authorization: `Bearer ${accessToken}` } })
    .then(() => (result = true))
    .catch((error) => console.error(error));
  return result;
};

export const loadAllHouseType = async () => {
  const url = "/houses/types";
  let result: IHouseType[] = [];
  await axiosInstance
    .get(url)
    .then((response) => {
      result = response.data as IHouseType[];
    })
    .catch((error) => console.error(error));
  return result;
};
