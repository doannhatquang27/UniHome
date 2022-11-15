import { GetHousesByUniversityDTO } from "../dtos/universityDtos/GetHousesByUniversityDTO";
import { IHouseListWithTotalPage } from "../interfaces/UniHouseApiInterfaces/IHouseListWithTotalPage";
import IUniversity from "../interfaces/UniHouseApiInterfaces/IUniversity";
import axiosInstance from "./axios-instance";

export const getAllUniversitiesAPI = async () => {
  const url = "/universities/active";
  let result: IUniversity[] = [];
  await axiosInstance
    .get(url)
    .then((response) => {
      result = response.data as IUniversity[];
    })
    .catch((error) => console.error(error));
  return result;
};

export const getHousesByUniversityAPI = async (
  payload: GetHousesByUniversityDTO
) => {
  const { page, pageSize } = payload;
  const url = `/universities/${payload.id}/houses`;
  let result: IHouseListWithTotalPage | undefined;
  await axiosInstance
    .get(url, { params: { page, pageSize } })
    .then((res) => (result = res.data as IHouseListWithTotalPage))
    .catch((err) => console.error(err));
  return result;
};
