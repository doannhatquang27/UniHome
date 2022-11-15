import IBookSlot from "../interfaces/UniHouseApiInterfaces/IBookingSlot";
import axiosInstance from "./axios-instance";

export const loadAllSlotsByHouseIdAPI = async (houseId: string) => {
  const url = "/qna/rent";
  let result: IBookSlot[] = [];
  await axiosInstance
    .get(url, { params: { houseId } })
    .then((response) => {
      result = response.data as IBookSlot[];
    })
    .catch((error) => console.error(error));
  return result;
};
