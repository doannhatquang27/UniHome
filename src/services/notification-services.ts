import { INotificationWithTotalPage } from "../interfaces/UniHouseApiInterfaces/INotificationWithTotalPage";
import axiosInstance from "./axios-instance";

export const getNotificationListByUserIdAPI = async (
  userId: string,
  page: number,
  pageSize: number,
  accessToken: string
) => {
  const url = "/noti/user";
  let result: INotificationWithTotalPage = {
    notifications: [],
    totalPage: 0,
  };
  await axiosInstance
    .get(url, {
      params: { userId, page, pageSize },
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((response) => {
      result = response.data as INotificationWithTotalPage;
    })
    .catch((error) => console.error(error));
  return result;
};

export const updateNotificationStatusAPI = async (
  notiId: number,
  userId: string,
  accessToken: string
) => {
  const url = "/noti/read";
  let result = false;
  await axiosInstance
    .put(url, null, {
      params: { notiId, userId },
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((response) => {
      result = response.data as boolean;
    })
    .catch((error) => console.error(error));
  return result;
};
