import { AxiosError } from "axios";
import { AbortAppointmentDto } from "../dtos/appointmentDtos/AbortAppointmentDto";
import CreateAppointmentDto from "../dtos/appointmentDtos/CreateAppointmentDto";
import IAppointment from "../interfaces/UniHouseApiInterfaces/IAppointment";
import IAppointmentWithTotalRecord from "../interfaces/UniHouseApiInterfaces/IAppointmentWithTotalRecord";
import axiosInstance, { writeLogAndReturnErrorMsg } from "./axios-instance";

export const getWaitingAppointmentListOfRenterAPI = async (
  renterId: string,
  accessToken: string | null
) => {
  const url = `/appointments/waiting/renter/${renterId}`;
  let result: IAppointmentWithTotalRecord | string | undefined;
  await axiosInstance
    .get(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((response) => {
      result = response.data as IAppointmentWithTotalRecord;
    })
    .catch((error) => {
      result = writeLogAndReturnErrorMsg(error);
    });
  return result;
};

export const getAcceptedAppointmentListOfRenterAPI = async (
  renterId: string,
  accessToken: string | null
) => {
  const url = `/appointments/accepted/renter/${renterId}`;
  let result: IAppointmentWithTotalRecord | string | undefined;
  await axiosInstance
    .get(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((response) => {
      result = response.data as IAppointmentWithTotalRecord;
    })
    .catch((error) => {
      result = writeLogAndReturnErrorMsg(error);
    });
  return result;
};

export const getRejectedAppointmentListOfRenterAPI = async (
  renterId: string,
  accessToken: string | null
) => {
  const url = `/appointments/rejected/renter/${renterId}`;
  let result: IAppointmentWithTotalRecord | string | undefined;
  await axiosInstance
    .get(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((response) => {
      result = response.data as IAppointmentWithTotalRecord;
    })
    .catch((error) => {
      result = writeLogAndReturnErrorMsg(error);
    });
  return result;
};

export const createAppointmentAPI = async (
  createAppointmentDTO: CreateAppointmentDto
) => {
  const url = "/appointments";
  let result: IAppointment | string | undefined;
  await axiosInstance
    .post(url, createAppointmentDTO)
    .then((res) => (result = res.data))
    .catch((err: AxiosError) => {
      result = writeLogAndReturnErrorMsg(err);
    });
  return result;
};

export const updateAppointmentAPI = async (updateAppointmentDTO: any) => {
  const url = "/appointment/update";
  let result = false;
  await axiosInstance
    .put(url, updateAppointmentDTO)
    .then(() => (result = true))
    .catch((error) => console.error(error));
  return result;
};

export const getWaitingAppointmentListOfOwnerAPI = async (
  ownerId: string,
  page: number,
  pageSize: number,
  accessToken: string
) => {
  const url = `/appointments/waiting/owners/${ownerId}`;
  let result: IAppointmentWithTotalRecord | undefined;
  await axiosInstance
    .get(url, {
      params: { page, pageSize },
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((response) => {
      result = response.data as IAppointmentWithTotalRecord;
    })
    .catch((error) => console.error(error));
  return result;
};

export const getAcceptedAppointmentListOfOwnerAPI = async (
  ownerId: string,
  page: number,
  pageSize: number,
  accessToken: string
) => {
  const url = `/appointments/accepted/owners/${ownerId}`;
  let result: IAppointmentWithTotalRecord | undefined;
  await axiosInstance
    .get(url, {
      params: { page, pageSize },
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((response) => {
      result = response.data as IAppointmentWithTotalRecord;
    })
    .catch((error) => console.error(error));
  return result;
};

export const getRejectedAppointmentListOfOwnerAPI = async (
  ownerId: string,
  page: number,
  pageSize: number,
  accessToken: string
) => {
  const url = `/appointments/rejected/owners/${ownerId}`;
  let result: IAppointmentWithTotalRecord | undefined;
  await axiosInstance
    .get(url, {
      params: { page, pageSize },
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((response) => {
      result = response.data as IAppointmentWithTotalRecord;
    })
    .catch((error) => console.error(error));
  return result;
};

export const abortAppointmentAPI = async (
  data: AbortAppointmentDto,
  accessToken: string
) => {
  const url = "/appointment/abort";
  let result: IAppointment | undefined;
  await axiosInstance
    .put(url, data, { headers: { Authorization: `Bearer ${accessToken}` } })
    .then((response) => {
      result = response.data as IAppointment;
    })
    .catch((error) => console.error(error));
  return result;
};
