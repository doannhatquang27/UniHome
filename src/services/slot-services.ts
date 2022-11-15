import IBookSlot from "../interfaces/UniHouseApiInterfaces/IBookingSlot";
import axiosInstance from "./axios-instance";

export const loadAllSlotsByHouseId = async (houseId: string) => {
  const url = "/slot/house";
  let result: IBookSlot[] = [];
  await axiosInstance
    .get(url, { params: { houseId } })
    .then((response) => {
      result = response.data as IBookSlot[];
    })
    .catch((error) => console.error(error));
  return result;
};

export const loadSlotById = async (id: string, accessToken: string) => {
  const url = "/slot/id";
  let result: IBookSlot | undefined = undefined;
  await axiosInstance
    .get(url, {
      params: { id },
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((response) => {
      result = response.data as IBookSlot;
    })
    .catch((error) => console.error(error));
  return result;
};

export const createSlot = async (data: IBookSlot, accessToken: string) => {
  const url = "/slot/create";
  let result = false;
  await axiosInstance
    .post(url, data, { headers: { Authorization: `Bearer ${accessToken}` } })
    .then(() => {
      result = true;
    })
    .catch((error) => console.error(error));
  return result;
};

export const createSlotByHouse = async (
  houseId: string,
  slots: IBookSlot[],
  accessToken: string
) => {
  const url = "/slot/createbulk";
  let result = false;
  const data = {
    houseId,
    slots,
  };
  await axiosInstance
    .post(url, data, { headers: { Authorization: `Bearer ${accessToken}` } })
    .then(() => (result = true))
    .catch((error) => console.error(error));
  return result;
};

export const updateSlot = async (data: IBookSlot, accessToken: string) => {
  const url = "/slot/update";
  let result = false;
  await axiosInstance
    .put(url, data, { headers: { Authorization: `Bearer ${accessToken}` } })
    .then(() => (result = true))
    .catch((error) => console.error(error));
  return result;
};

export const deleteSlotsByHouseId = async (
  houseId: string,
  accessToken: string
) => {
  const url = "/slot/update";
  let result = false;
  await axiosInstance
    .delete(url, {
      params: { houseId },
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then(() => (result = true))
    .catch((error) => console.error(error));
  return result;
};
