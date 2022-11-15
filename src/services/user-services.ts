import { AxiosError } from "axios";
import { ILoginResponse } from "../interfaces/UniHouseApiInterfaces/ILoginResponse";
import IUser from "../interfaces/UniHouseApiInterfaces/IUser";
import axiosInstance, { writeLogAndReturnErrorMsg } from "./axios-instance";

export const loginWithGoogle = async (
  accessToken: string | undefined,
  googleId: string | undefined
) => {
  const url = "/auth/login";
  let result: ILoginResponse | undefined;
  const request = { accessToken: accessToken, deviceToken: googleId };
  await axiosInstance
    .post(url, request)
    .then((response) => {
      if (response.status === 200) {
        result = {
          user: response.data["account"],
          accessToken: response.data["accessToken"],
        };
      }
    })
    .catch((error) => console.error(error));
  return result;
};

export const updateProfile = async (data: IUser, accessToken: string) => {
  const url = `/users/${data.userId}`;
  let result = false;
  await axiosInstance
    .put(url, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((_) => (result = true))
    .catch((err) => console.error(err));
  return result;
};

export const registerUser = async (
  accessToken: any,
  fullname: any,
  phone: any,
  dob: any,
  image: any,
  email: any,
  universityId: any
) => {
  const url = "/auth/register";
  let result: number | string | undefined;
  const request = {
    accessToken: accessToken,
    user: {
      email: email,
      phone: phone,
      fullname: fullname,
      dateOfBirth: dob,
      image: image,
      roleCode: 1, //renter
      universityId: universityId,
    },
  };
  await axiosInstance
    .post(url, request)
    .then((response) => {
      result = response.status;
    })
    .catch((err: AxiosError) => {
      result = writeLogAndReturnErrorMsg(err);
    });
  return result;
};
