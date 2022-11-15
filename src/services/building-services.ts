import IBuilding from "../interfaces/UniHouseApiInterfaces/IBuilding";
import axiosInstance from "./axios-instance";

export const loadAllBuilding = async () => {
  const url = "/buildings/all";
  let result: IBuilding[] = [];
  await axiosInstance
    .get(url)
    .then((response) => {
      result = response.data as unknown as IBuilding[];
    })
    .catch((error) => console.error(error));
  return result;
};
