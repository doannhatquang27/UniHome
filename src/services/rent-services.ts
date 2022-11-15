import { NewRentAndServiceFacilityDto } from "../dtos/rentDtos/NewRentAndServiceFacilityDto";
import { IHouseListWithTotalPage } from "../interfaces/UniHouseApiInterfaces/IHouseListWithTotalPage";
import IRentEntitiesWithTotalPage from "../interfaces/UniHouseApiInterfaces/IRentEntitiesWithTotalPage";
import IRentEntity from "../interfaces/UniHouseApiInterfaces/IRentEntity";
import IRentType from "../interfaces/UniHouseApiInterfaces/IRentType";
import axiosInstance from "./axios-instance";

export const loadAllRentTypesAPI = async () => {
  const url = "./rent-entities/types";
  let result: IRentType[] = [];
  await axiosInstance
    .get(url)
    .then((response) => {
      result = response.data as IRentType[];
    })
    .catch((error) => console.error(error));
  return result;
};

export const loadAllAvailableRentEntitiesAPI = async (page: number) => {
  const url = "/rent-entities";
  let result: IRentEntitiesWithTotalPage | undefined;
  await axiosInstance
    .get(url, { params: { page } })
    .then((response) => {
      result = response.data as IRentEntitiesWithTotalPage;
    })
    .catch((error) => console.error(error));
  return result;
};

export const loadAvailableRentByIdAPI = async (id: string) => {
  const url = `/rent-entities/${id}/available`;
  let result: IRentEntity | undefined;
  await axiosInstance
    .get(url)
    .then((response) => {
      result = response.data as IRentEntity;
    })
    .catch((error) => console.error(error));
  return result;
};

export const findAvailableRentEntitiesAPI = async (
  category: string | null,
  minPrice: number,
  maxPrice: number,
  minArea: number,
  maxArea: number,
  orderBy: number,
  orderType: number,
  gender: number,
  page: number,
  pageSize: number,
  districtId?: string,
  wardId?: string,
  isSharing?: number,
  name?: string
) => {
  const url = "/rent/find";
  let params: { [k: string]: any } = {};
  params = {
    category,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    orderBy,
    orderType,
    page,
    pageSize,
    gender,
  };
  if (districtId) {
    params.districtId = districtId;
  }
  if (wardId) {
    params.wardId = wardId;
  }
  if (typeof isSharing === "number") {
    params.isSharing = isSharing;
  }
  if (name) {
    params.nameRandom = name;
  }
  let result: IRentEntitiesWithTotalPage | undefined;
  await axiosInstance
    .get(url, { params: params })
    .then((response) => {
      result = response.data as IRentEntitiesWithTotalPage;
    })
    .catch((error) => console.error(error));
  return result;
};

export const loadAllSharingEntitiesByOwnerId = async (creatorId: string) => {
  const url = "/houses";
  let params: { [k: string]: any } = {};
  params = { creatorId };
  let result: IHouseListWithTotalPage | undefined;
  await axiosInstance.get(url, { params: params }).then((response) => {
    result = response.data as IHouseListWithTotalPage;
  });
  return result;
};

export const loadRentEntitiesByDistanceAPI = async (
  x: number,
  y: number,
  pageSize: number
) => {
  const url = "/rent/distance";
  let result: IRentEntity[] = [];
  await axiosInstance
    .get(url, { params: { x, y, pageSize } })
    .then((response) => {
      result = response.data.rentEntities as IRentEntity[];
    })
    .catch((error) => console.error(error));
  return result;
};

export const loadRentEntityByNameAPI = async (
  name: string,
  page: number,
  pageSize: number
) => {
  const url = `/rent/name/${name}`;
  let result: IRentEntitiesWithTotalPage | undefined;
  await axiosInstance
    .get(url, { params: { page, pageSize } })
    .then((response) => {
      result = response.data as IRentEntitiesWithTotalPage;
    })
    .catch((error) => console.error(error));
  return result;
};

export const deleteRentEntity = async (rentId: string) => {
  const url = "/deleterent";
  let result: boolean = false;
  await axiosInstance
    .delete(url, { data: { rentId } })
    .then((response) => {
      if (response.status === 200) {
        result = true;
      }
    })
    .catch((error) => console.error(error));
  return result;
};

export const addRentEntity = async (
  request: NewRentAndServiceFacilityDto,
  accessToken: string
) => {
  const url = "/rent-entities/with-amenities";
  let result: boolean = false;
  await axiosInstance
    .post(url, request, { headers: { Authorization: `Bearer ${accessToken}` } })
    .then((response) => {
      if (response.status === 200) {
        result = true;
      }
    })
    .catch((error) => console.error(error));
  return result;
};

export const loadRentByUniversityId = async (
  universityId: string,
  pageSize: number
) => {
  const url = "/rent/university/distance";
  let result: IRentEntitiesWithTotalPage | undefined;
  await axiosInstance
    .get(url, { params: { universityId, pageSize } })
    .then((response) => {
      result = response.data as IRentEntitiesWithTotalPage;
    })
    .catch((error) => console.error(error));
  return result;
};

export const getRentListOfOneHouseByHouseIdAPI = async (
  houseId: string,
  rentTypeId: string | null,
  orderBy: number,
  orderType: number
) => {
  const url = "/rent-entities";
  let result: IRentEntitiesWithTotalPage | undefined;
  await axiosInstance
    .get(url, { params: { houseId, rentTypeId, orderBy, orderType } })
    .then((response) => {
      result = response.data as IRentEntitiesWithTotalPage;
    })
    .catch((error) => console.error(error));
  return result;
};

export const blockRentForDepositRequestAPI = async (
  rentId: string,
  accessToken: string
) => {
  const url = `/rent-entities/${rentId}/depositing`;
  let result: IRentEntity | undefined;
  await axiosInstance
    .put(url, null, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((response) => {
      result = response.data as IRentEntity;
    })
    .catch((error) => console.error(error));
  return result;
};

export const depositRentAPI = async (rentId: string, accessToken: string) => {
  const url = `/rent-entities/${rentId}/deposited`;
  let result: IRentEntity | undefined;
  await axiosInstance
    .put(url, null, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((response) => {
      result = response.data as IRentEntity;
    })
    .catch((error) => console.error(error));
  return result;
};

export const getRentListWithRentTypeAPI = async (rentTypeId: string) => {
  const url = "/rent-entities";
  let result: IRentEntitiesWithTotalPage | undefined;
  await axiosInstance
    .get(url, {
      params: {
        rentTypeId,
        status: 1,
        houseStatus: 1,
        pageSize: 3,
        pageNumber: 1,
      },
    })
    .then((response) => {
      result = response.data as IRentEntitiesWithTotalPage;
    })
    .catch((error) => console.error(error));
  return result;
};
